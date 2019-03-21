import {
  ViewEncapsulation,
  Component,
  OnInit,
  OnDestroy,
  AfterContentInit,
  ContentChild,
  ChangeDetectionStrategy
} from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";
import { MokaMenuComponent } from "./moka-menu.component";

@Component({
  selector: "moka-menu-accordion",
  template: `
    <ng-content></ng-content>
  `,
  host:{
    '[attr.class]':'"moka-menu-accordion"'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MokaMenuAccordionComponent
  implements OnInit, OnDestroy, AfterContentInit {
  private ngUnsubscribe: Subject<any>;

  @ContentChild(MokaMenuComponent) _menu: MokaMenuComponent;

  constructor(private router: Router) {
    this.ngUnsubscribe = new Subject<any>();
  }

  ngAfterContentInit() {
    this._menu.setAvtiveUrl(this.router.url);
  }

  ngOnInit() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((event: NavigationEnd) => {
        this._menu.setAvtiveUrl(event.url);
      });
  }

  ngOnDestroy() {
    // 取消订阅
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
