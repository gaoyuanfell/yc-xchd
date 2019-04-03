import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter , MatMomentDateModule  } from '@angular/material-moment-adapter';
import { CdkModule } from 'src/app/cdk-module';
import { MatModule } from 'src/app/mat-module';
import { CalendarBodyComponent } from './calendar-body/calendar-body.component';
import { CalendarComponent, CalendarHeaderComponent } from './calendar/calendar.component';
import { DatepickerComponent, DatepickerContentComponent, MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER } from './datepicker-content/datepicker-content.component';
import { DatepickerInputDirective } from './datepicker-input';
import { MonthViewComponent } from './month-view/month-view.component';
import { MultiYearViewComponent } from './multi-year-view/multi-year-view.component';
import { YearViewComponent } from './year-view/year-view.component';

@NgModule({
  declarations: [DatepickerInputDirective, CalendarBodyComponent, MonthViewComponent, CalendarComponent, MultiYearViewComponent, YearViewComponent, CalendarHeaderComponent, DatepickerContentComponent, DatepickerComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatModule,
    CdkModule,
    MatMomentDateModule,
  ],
  exports: [
    DatepickerInputDirective,
    CalendarBodyComponent,
    MonthViewComponent,
    CalendarComponent,
    MultiYearViewComponent,
    YearViewComponent,
    CalendarHeaderComponent,
    DatepickerContentComponent,
    DatepickerComponent,
  ],
  providers: [
    MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER,
    { provide: MAT_DATE_LOCALE, useValue: 'ja-JP' },
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
  entryComponents: [
    CalendarHeaderComponent,
    DatepickerContentComponent,
  ]
})
export class DatepickerModule { }
