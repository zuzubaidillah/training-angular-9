import {Component, OnInit, AfterViewInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../../core/services/auth.service';
import {LandaService} from '../../../core/services/landa.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, AfterViewInit {

    signupForm: FormGroup;
    submitted = false;
    error = '';
    successmsg = false;

    // set the currenr year
    year: number = new Date().getFullYear();

    // tslint:disable-next-line: max-line-length
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private landaService: LandaService) {
    }

    ngOnInit() {

        this.signupForm = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
    }

    ngAfterViewInit() {
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.signupForm.controls;
    }

    /**
     * On submit form
     */
    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.signupForm.invalid) {
            return;
        }

        this.landaService
            .DataPost('/site/signup', {
                name: this.f.name.value,
                email: this.f.email.value,
                password: this.f.password.value,
                sumber: 1,
            })
            .subscribe((res: any) => {
                /**
                 * Simpan detail user ke session storage
                 */
                // console.log(res);
                // return;
                if (res.status_code == 200) {
                    this.authenticationService
                        .register(this.f.email.value, this.f.password.value)
                        .then((res: any) => {
                            this.successmsg = true;
                            if (this.successmsg) {
                                this.router.navigate(['/home']);
                            }
                        })
                        .catch(error => {
                            this.error = error ? error : '';
                        });
                } else {
                    this.error = res.errors[0];
                }
            });
    }
}
