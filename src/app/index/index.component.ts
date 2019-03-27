import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent implements OnInit {

  constructor(public platform: Platform) { }

  ngOnInit() {
    this.items = Array.from({length: 10000}).map((_, i) => `Item #${i}`);
  }

  items:Array<any>

  value

}
