import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "moka-menu",
  templateUrl: "./moka-menu.component.html",
  styleUrls: ["./moka-menu.component.less"]
})
export class MokaMenuComponent implements OnInit {
  @Input("list") list;

  private defaultProps: any = {
    name: "name",
    route: "route",
    icon: "icon",
    child: 'child'
  };

  private _props;
  @Input("props") set props(val) {
    this._props = val;
  }

  get props() {
    return this._props
  }

  get useProps() {
    return Object.assign({ ...this.defaultProps, ...this._props });
  }

  constructor() {}

  ngOnInit() {}
}
