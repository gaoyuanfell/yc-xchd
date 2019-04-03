import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarBodyComponent } from './calendar-body/calendar-body.component';
import { MonthViewComponent } from './month-view/month-view.component';
import { MatModule } from 'src/app/mat-module';
import { CdkModule } from 'src/app/cdk-module';
import { CalendarComponent, CalendarHeaderComponent } from './calendar/calendar.component';
import { MultiYearViewComponent } from './multi-year-view/multi-year-view.component';
import { YearViewComponent } from './year-view/year-view.component';
import { DatepickerContentComponent, DatepickerComponent, MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER } from './datepicker-content/datepicker-content.component';
import { DatepickerInputDirective } from './datepicker-input';

@NgModule({
  declarations: [CalendarBodyComponent, MonthViewComponent, CalendarComponent, MultiYearViewComponent, YearViewComponent, CalendarHeaderComponent, DatepickerContentComponent, DatepickerComponent, DatepickerInputDirective],
  imports: [
    CommonModule,
    MatModule,
    CdkModule,
  ],
  exports:[
    CalendarBodyComponent,
    MonthViewComponent,
    CalendarComponent,
    MultiYearViewComponent,
    YearViewComponent,
    CalendarHeaderComponent,
    DatepickerContentComponent,
    DatepickerComponent,
    DatepickerInputDirective,
  ],
  providers: [
    MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER,
  ],
  entryComponents:[
    CalendarHeaderComponent,
    DatepickerContentComponent,
  ]
})
export class DatepickerModule { }
