import {Component, OnInit, ViewChild} from '@angular/core';
import {LandaService} from "../../../core/services/landa.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    dtOptions: any;
    breadCrumbItems: Array<{}>;
    pageTitle: string;
    isView: boolean;
    isEdit: boolean;
    modelParam: {
        nama,
        kategori
    }
    listData: any;
    listJabatan: any;
    listAkses: any;
    showForm: boolean;
    listKabupaten: any;
    listProvinsi: any;
    listSupplier: any;
    listStatus: any;

    modelCheck: {
        DataMaster
    }
    model: {
        nama,
        password,
        username,
        akses: {
            barang,
            pengguna
        }
    };

    constructor(private landaService: LandaService, private router: Router) {
    }

    ngOnInit(): void {
        this.pageTitle = 'Profile';
        this.breadCrumbItems = [{
            label: 'Master',
            link: ''
        }, {
            label: 'Pengguna',
            link: '/master/pengguna'
        }, {
            label: 'Profile',
            active: true
        }];
        this.modelParam = {
            nama: '',
            kategori: ''
        }
        this.getData();
        this.empty();
    }

    getData() {
        this.dtOptions = {
            serverSide: true,
            processing: true,
            ordering: false,
            pagingType: 'full_numbers',
            ajax: (dataTablesParameters: any, callback) => {
                const params = {
                    filter: JSON.stringify(this.modelParam),
                    offset: dataTablesParameters.start,
                    limit: dataTablesParameters.length,
                };
                this.landaService
                    .DataGet('/m_pengguna/index', params)
                    .subscribe((res: any) => {
                        this.listData = res.data.list;
                        callback({
                            recordsTotal: res.data.totalItems,
                            recordsFiltered: res.data.totalItems,
                            data: [],
                        });
                    });
            },
        };
    }


    empty() {
        this.modelCheck = {
            DataMaster: false
        }
        this.model = {
            nama: "",
            password: "",
            username: "",

            akses: {
                barang: false,
                pengguna: false
            }


        }
        this.getData();
    }

    save() {
        const final = Object.assign(this.model);
        this.landaService.DataPost('/m_pengguna/save', final).subscribe((res: any) => {
            if (res.status_code === 200) {
                this.landaService.alertSuccess('Berhasil', 'Data Pengguna telah disimpan!');
            } else {
                this.landaService.alertError('Mohon Maaf', res.errors);
            }
        });

    }
}
