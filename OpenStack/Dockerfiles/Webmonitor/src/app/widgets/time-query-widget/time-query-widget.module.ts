import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { TimeQueryWidgetComponent } from './time-query-widget.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [TimeQueryWidgetComponent]
})
export class TimeQueryWidgetModule {
    static entry = TimeQueryWidgetComponent;
}
