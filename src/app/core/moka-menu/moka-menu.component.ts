/*
 * @Author: moka === gaoyuanfell@sina.com
 * @Date: 2019-03-08 15:11:23
 * @Last Modified by: moka
 * @Last Modified time: 2019-03-19 09:58:18
 */
import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "moka-menu",
  templateUrl: "./moka-menu.component.html",
  styleUrls: ["./moka-menu.component.scss"],
  encapsulation: ViewEncapsulation.None,
  host: {
    "[attr.class]": '"menu"',
    "[@expansion]": "_getExpandedState()"
  },
  animations: [
    trigger("expansion", [
      state("collapsed, void", style({ height: "0px", visibility: "hidden" })),
      state("expanded", style({ height: "*", visibility: "visible" })),
      transition(
        "expanded <=> collapsed, void => collapsed",
        animate("225ms cubic-bezier(0.4,0.0,0.2,1)")
      )
    ])
  ]
})
export class MokaMenuComponent implements OnInit {

  @Input("list") list;

  private defaultProps: any = {
    name: "name",
    route: "route",
    icon: "icon",
    child: "child"
  };

  private _props;
  @Input("props") set props(val) {
    this._props = val;
  }

  get props() {
    return this._props;
  }

  get useProps() {
    return Object.assign({ ...this.defaultProps, ...this._props });
  }

  @Input("expanded") expanded: boolean = false;

  _getExpandedState() {
    return this.expanded ? "expanded" : "collapsed";
  }

  setAvtiveUrl(url) {
    for (let index = 0; index < this.list.length; index++) {
      const element = this.list[index];
      this.defaultChildren(element);
      let bo = this.isUrlInChildren(element, url);
      element._childExpanded = bo;
      if (bo) this.activeItem = element;
    }
  }

  isUrlInChildren(parent, url) {
    let child = parent[this.useProps.child];
    if (child) {
      for (let i = 0; i < child.length; i++) {
        let item = child[i];
        item._routerLinkActive = false;
        if (item[this.useProps.child]) {
          this.isUrlInChildren(child[i], url);
        }
        if (
          item[this.useProps.route] === url ||
          url.includes(item[this.useProps.route])
        ) {
          item._routerLinkActive = true;
          return true;
        }
      }
    }
    return false;
  }

  defaultChildren(parent) {
    let child = parent[this.useProps.child];
    if (child) {
      for (let i = 0; i < child.length; i++) {
        let item = child[i];
        item._routerLinkActive = false;
        if (item[this.useProps.child]) {
          this.defaultChildren(child[i]);
        }
      }
    }
  }

  activeItem;

  menuClick(event: Event, item) {
    event.stopPropagation();
    if (this.activeItem !== item) {
      this.list.forEach(element => {
        let child = element[this.useProps.child];
        if (child && child.length) {
          element._childExpanded = false;
        }
      });
    }
    this.activeItem = item;

    let child = item[this.useProps.child];
    if (child && child.length) {
      item._childExpanded = !item._childExpanded;
    }
    let link = item[this.useProps.route];
    if (!link) return;
    this.router.navigateByUrl(link);
  }

  constructor(private router: Router) {

  }

  ngOnInit() {}
}
