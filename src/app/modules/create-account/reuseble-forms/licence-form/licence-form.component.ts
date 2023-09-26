import { Component, OnInit, forwardRef, OnDestroy } from '@angular/core';
import {
    ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder,
    FormGroup, Validators, FormControl, NG_VALIDATORS, Validator
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { CreateAcntService } from 'src/app/services/create-acnt.service';

export interface LicenseFormValues {
}

@Component({
    selector: 'app-licence-form',
    templateUrl: './licence-form.component.html',
    styleUrls: ['./licence-form.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => LicenceFormComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => LicenceFormComponent),
            multi: true
        }
    ]
})
export class LicenceFormComponent implements ControlValueAccessor, OnDestroy, Validator {
    licenceForm: FormGroup;
    licenceDoc: FormGroup;
    EcDoc: FormGroup
    subscriptions: Subscription[] = [];

    get value(): LicenseFormValues {
        return this.licenceForm.value;
    }
    set value(value: LicenseFormValues) {
        this.licenceForm.setValue(value);
        this.onChange(value);
        this.onTouched();
    }
    constructor(private fb: FormBuilder,private createAcnt:CreateAcntService) {
        this.licenceForm = this.fb.group({
            licenseDocument: ['', Validators.required],
			licenceFileName:'',
            companyName: new FormControl("", [Validators.required]),
            ecCopy: new FormControl("", Validators.required),
            licenceNum:new FormControl("",Validators.required),
            licenceExpiry:new FormControl("",Validators.required),
            eCNumber:new FormControl("",Validators.required)
        })
        this.subscriptions.push(
            this.licenceForm.valueChanges.subscribe(value => {
                this.onChange(value);
                this.onTouched();
            })
        )
    }
    uploadLicencefile(event: any) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.licenceForm.get('licenseDocument')?.setValue(file);
        }
    }
    uploadEcfile(event: any) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.licenceForm.get('ecCopy')?.setValue(file);
        }
    }
   
    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
    writeValue(value: any): void {
        if (value) this.value = value;
        if (value === null) { this.licenceForm.reset(); }
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }


    // ngOnInit(): void {
    // }

    onChange: any = () => { };
    onTouched: any = () => { };

    //  inner form validation to the parent form
    validate(_: FormControl) {
        return this.licenceForm.valid ? null : { profile: { valid: false } };
    }
}
