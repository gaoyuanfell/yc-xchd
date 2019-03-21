import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation, OnDestroy, ChangeDetectorRef, NgZone, AfterContentChecked, AfterViewChecked } from '@angular/core';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { fromEvent, Subject } from 'rxjs';
import { PinDirective } from 'src/app/components/pin/pin.directive';
import { StickyDirective } from 'src/app/components/sticky/sticky.directive';
import { MokaTableService } from './moka-table.service';

@Component({
  selector: 'moka-table',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    "[attr.class]": '"moka-table"',
  },
  styleUrls: ['./moka-table.component.less'],
})
export class MokaTableComponent implements OnDestroy, OnInit {

  ngOnInit() {
    this.mokaTableService.retainSubject.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
      this.pinDirectives.forEach((p) => {
        p.subscribeChange()
      })
      this.stickyDirectives.forEach((p) => {
        // console.info('aa')
        p.subscribeChange()
      })
    })

    fromEvent(window, "resize").pipe(debounceTime(0), takeUntil(this.ngUnsubscribe)).subscribe(() => {
      this.pinDirectives.forEach((p) => {
        p.subscribeChange()
      })
      this.stickyDirectives.forEach((p) => {
        p.subscribeChange()
      })
    });
  }

  ngOnDestroy() {
    // this.ngUnsubscribe.next()
    // this.ngUnsubscribe.complete()
  }

  private ngUnsubscribe: Subject<any>;
  pinDirectives: PinDirective[];
  stickyDirectives: StickyDirective[];

  constructor(private mokaTableService: MokaTableService) {
    this.pinDirectives = [];
    this.stickyDirectives = [];
    this.ngUnsubscribe = new Subject<any>();
  }
}
