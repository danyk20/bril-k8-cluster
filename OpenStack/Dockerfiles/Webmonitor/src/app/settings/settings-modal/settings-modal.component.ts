import {
    Component, OnInit, OnDestroy, ViewChild, ComponentFactory, ComponentRef,
    ComponentFactoryResolver, ViewContainerRef, Input
} from '@angular/core';
import { ClrModal } from '@clr/angular';

import { DashboardComponent } from 'app/core/dashboard/dashboard.component';
import { TimersComponent } from '../settings/timers/timers.component';
import { PresetExportComponent } from '../settings/preset-export/preset-export.component';
import { PresetImportComponent } from '../settings/preset-import/preset-import.component';

type SettingView = {label: string, component: any}

const settingsViews: Array<SettingView> = [{
    label: 'Timers',
    component: TimersComponent
}, {
    label: 'Preset export',
    component: PresetExportComponent
}, {
    label: 'Preset import',
    component: PresetImportComponent
}];


@Component({
    selector: 'app-settings-modal',
    templateUrl: './settings-modal.component.html',
    styleUrls: ['./settings-modal.component.css']
})
export class SettingsModalComponent implements OnInit, OnDestroy {

    @Input('dashboard') dashboard: DashboardComponent;

    @ViewChild('modal', { static: true }) modal: ClrModal;
    @ViewChild('settingsOutlet', { read: ViewContainerRef, static: true }) container;
    componentRef: ComponentRef<any>;
    settings = settingsViews;
    activeSetting = null;

    constructor(protected resolver: ComponentFactoryResolver) { }

    ngOnInit() {
    }

    open() {
        this.modal.open();
    }

    selectView(view: SettingView) {
        this.showComponent(view.component);
        this.activeSetting = view;
    }

    showComponent(cmp) {
        this.container.clear();
        const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(cmp);
        this.componentRef = this.container.createComponent(factory);
        this.componentRef.instance['dashboard'] = this.dashboard;
    }

    ngOnDestroy() {
        this.componentRef.destroy();
    }

}
