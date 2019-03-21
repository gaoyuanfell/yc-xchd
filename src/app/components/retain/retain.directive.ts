import { ContentChildren, Directive, QueryList, OnDestroy, ChangeDetectorRef, AfterContentChecked, OnInit, AfterContentInit, NgZone, AfterViewChecked } from '@angular/core';
import { PinDirective } from '../pin/pin.directive';
import { RetainService } from './retain.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { StickyDirective } from '../sticky/sticky.directive';
import { fromEvent } from 'rxjs';

@Directive({
  selector: '[retain]'
})
export class RetainDirective implements OnDestroy, OnInit, AfterContentInit, AfterContentChecked, AfterViewChecked {

  ngAfterViewChecked() {

  }

  ngAfterContentChecked(): void {

    // if(this.isStickyDirectives){
    //   this.isStickyDirectives = false;
    //   this.stickyDirectives.forEach((p) => {
    //     p.subscribeChange()
    //   })
    // }

  }

  // isStickyDirectives = false;

  ngAfterContentInit() {

  }

  ngOnInit() {
    this.retainService.retainSubject.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
      this.pinDirectives.forEach((p) => {
        p.subscribeChange()
      })
      // this.isStickyDirectives = true;

      this.stickyDirectives.forEach((p) => {
        p.subscribeChange()
      })

    })

    fromEvent(window, "resize").pipe(debounceTime(100), takeUntil(this.ngUnsubscribe)).subscribe(() => {
      this.pinDirectives.forEach((p) => {
        p.subscribeChange()
      })
      this.stickyDirectives.forEach((p) => {
        p.subscribeChange()
      })
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next()
    this.ngUnsubscribe.complete()
  }

  private ngUnsubscribe: Subject<any>;
  pinDirectives: PinDirective[]
  stickyDirectives: StickyDirective[]

  constructor(private retainService: RetainService, private changeDetectorRef:ChangeDetectorRef, private ngZone: NgZone) {
    this.pinDirectives = [];
    this.stickyDirectives = [];
    this.ngUnsubscribe = new Subject<any>();
  }
}
