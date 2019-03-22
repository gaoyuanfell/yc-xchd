import { NgModule } from "@angular/core";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { PortalModule } from '@angular/cdk/portal';


@NgModule({
  imports: [
    DragDropModule,
    ScrollDispatchModule,
    PortalModule,
  ],
  exports: [
    DragDropModule,
    ScrollDispatchModule,
    PortalModule,
  ]
})
export class CdkModule { }
