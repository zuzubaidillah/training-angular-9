import {ElementRef, NgModule} from '@angular/core';
import {Component, OnInit, ViewChild} from "@angular/core";
import {environment} from "../../../environments/environment";
import {DataTableDirective} from "angular-datatables";
import {LandaService} from "../../core/services/landa.service";
import {ChartDataSets, ChartOptions} from 'chart.js';
// import {MultiDataSet, Color, Label} from 'ng2-charts';
import {ChartType} from 'chart.js';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.scss"],
})

export class DashboardComponent implements OnInit {
    @ViewChild('htmlData') htmlData:ElementRef;
    apiURL = environment.apiURL;
    breadCrumbItems: Array<{}>;
    pageTitle: string;
    jumlahPetani: any = [];
    TambakMasuk: any = [];
    listJadwal: any;
    model: any = [];
    y: any = [];

    diagram: {
        jumlahPetani,
        TambakMasuk
    }

    dgvalue: any;
    dataDiagram: any = [];
    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
    dtInstance: Promise<DataTables.Api>;
    dtOptions: any;
    // CHARTS 1
    // barChartLabels: Label[] = [];
    ChartDataSets: any;
    chartBarOptions: any;
    chartBarLegend: any;
    barChartType: ChartType = 'bar';
    // barChartData: MultiDataSet[] = [];
    // barChartColor: Color[] = [];
    listTahun: any[];
    luas: number;
    dataGrafik: any;
    dataTableV: any = [];
    USERS = [
        {
            "id": 1,
            "name": "Leanne Graham",
            "email": "sincere@april.biz",
            "phone": "1-770-736-8031 x56442"
        },
        {
            "id": 2,
            "name": "Ervin Howell",
            "email": "shanna@melissa.tv",
            "phone": "010-692-6593 x09125"
        },
        {
            "id": 3,
            "name": "Clementine Bauch",
            "email": "nathan@yesenia.net",
            "phone": "1-463-123-4447",
        },
        {
            "id": 4,
            "name": "Patricia Lebsack",
            "email": "julianne@kory.org",
            "phone": "493-170-9623 x156"
        },
        {
            "id": 5,
            "name": "Chelsey Dietrich",
            "email": "lucio@annie.ca",
            "phone": "(254)954-1289"
        },
        {
            "id": 6,
            "name": "Mrs. Dennis",
            "email": "karley@jasper.info",
            "phone": "1-477-935-8478 x6430"
        }
    ];

    constructor(private landaService: LandaService) {}
    public openPDF():void {
        let DATA = document.getElementById('htmlData');
        html2canvas(DATA).then(canvas => {

            let fileWidth = 208;
            let fileHeight = canvas.height * fileWidth / canvas.width;

            const FILEURI = canvas.toDataURL('image/png')
            let PDF = new jsPDF('p', 'mm', 'a4');
            let position = 0;
            PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

            PDF.save('angular-demo.pdf');
        });
    }
    ngOnInit() {
        this.pageTitle = "Dashboard";
        this.breadCrumbItems = [
            {
                label: "Welcome To Atina",
                active: true,
            },
        ];
    }
}


