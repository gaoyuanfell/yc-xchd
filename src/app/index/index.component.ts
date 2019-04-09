import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { Moment } from 'moment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent implements OnInit {

  constructor(public platform: Platform) { }

  ngOnInit() {
    this.items = Array.from({length: 10000}).map((_, i) => `Item #${i}`);
  }

  items:Array<any>

  value

  date1 = '2019-04-01'
  date2 = ['2019-04-01', '2019-04-02']

  query = {
    startDate:'2019-04-01',
    endDate: '2019-04-02'
  }

  startView: 'month' | 'year' | 'multi-year' = 'month'

  myFilter = (d: Moment): boolean => {
    const day = d.day();
    return day !== 0 && day !== 6;
  }

}
