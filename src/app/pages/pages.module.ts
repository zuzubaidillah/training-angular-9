import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { LayoutsModule } from "../layouts/layouts.module";
import { PagesRoutingModule } from "./pages-routing.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { GoogleMapsModule } from "@angular/google-maps";
import { DataTablesModule } from "angular-datatables";
import { FormsModule } from "@angular/forms";
import { NgbNavModule, NgbModule, NgbDatepickerModule, } from "@ng-bootstrap/ng-bootstrap";
// import { ChartsModule } from 'ng2-charts';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProducComponent } from './produc/produc.component';
// import { MasterComponent } from './master/master.component';
// import { NgxEchartsModule } from 'ngx-echarts';

// import { initFirebaseBackend } from "./../authUtils";
// import { ServiceWorkerModule } from "@angular/service-worker";
// import { AngularFireMessagingModule } from "@angular/fire/messaging";
// import { AngularFireModule } from "@angular/fire";
// import { MessagingService } from "./../core/services/messaging.service";
// import { environment } from "../../environments/environment";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    wheelSpeed: 0.3,
};

// initFirebaseBackend(environment.firebaseConfig);
@NgModule({
    declarations: [DashboardComponent, ProducComponent ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        PerfectScrollbarModule,
        LayoutsModule,
        GoogleMapsModule,
        DataTablesModule,
        FormsModule,
        NgbNavModule,
        NgbModule,
        NgbDatepickerModule,
        NgSelectModule,
        // NgxEchartsModule,
        // ServiceWorkerModule.register("ngsw-worker.js", {
        //     enabled: environment.production,
        // }),
        // AngularFireMessagingModule,
        // AngularFireModule.initializeApp(environment.firebaseConfig),
    ],
    providers: [
        // MessagingService,
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
        },
    ],
})
export class PagesModule { }
