import { Component, OnInit, forwardRef, OnDestroy } from '@angular/core';
import {
    ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder,
    FormGroup, Validators, FormControl, NG_VALIDATORS, Validator, FormArray
} from '@angular/forms';
import { Subscription } from 'rxjs'
import { CreateAcntService } from 'src/app/services/create-acnt.service';


export interface StaffFormValues {
    staffName: string;
    emiratesId: number;
    contact: number;
    joiningDate: Date;
    staffVisaNumber: number;
    staffBankName: string;
    staffAcNumber: string;
    basicSal: String;
    homeAllowance: String;
    transAllowance: String;
    bonus: String;
    ibanNum: String;
}
@Component({
    selector: 'app-staff-form',
    templateUrl: './staff-form.component.html',
    styleUrls: ['./staff-form.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => StaffFormComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => StaffFormComponent),
            multi: true
        }
    ]
})
export class StaffFormComponent implements ControlValueAccessor, OnDestroy, Validator {

    staffForm: FormGroup;
    addStaffForm: FormGroup;
    isForm: boolean = false;
    staffDetails: any = [
        //     { sno: 1, staffName: 'Aravind', salesId: 83904, contact: 9213232898 },
        // { sno: 1, staffName: 'Sudhakar', salesId: 83904, contact: 7826348723 }, { sno: 1, staffName: 'Sadhana', salesId: 83904, contact: 9687364867 }
    ]
    subscriptions: Subscription[] = [];

    get value(): StaffFormValues {
        return this.staffForm.value;
    }
    // get staff(): FormArray {
    //     return this.staffForm.get('staff') as FormArray
    // }
    set value(value: StaffFormValues) {
        this.staffForm.setValue(value);
        this.onChange(value);
        this.onTouched();
    }
    constructor(private fb: FormBuilder, private createAcnt: CreateAcntService) {

        this.staffForm = this.fb.group({
            emiratesId: new FormControl("", [Validators.required]),
            firstName: new FormControl("", [Validators.required]),
            lastName: new FormControl("", [Validators.required]),
            title: new FormControl("", [Validators.required]),
            gender: new FormControl("", [Validators.required]),
            mobileNumber: new FormControl("", [Validators.required]),
            salaryDetails: fb.group({
                basicSalary: new FormControl("", [Validators.required]),
                houseAllowance: new FormControl("", [Validators.required]),
                transportAllowance: new FormControl("", [Validators.required]),
                bonus: new FormControl("", [Validators.required]),
            }),
            bankDetails: fb.group({
                bankName: new FormControl("", [Validators.required]),
                accountNumber: new FormControl("", [Validators.required]),

            })
        })
        

        this.subscriptions.push(
            this.staffForm.valueChanges.subscribe(value => {
                this.onChange(value);
                this.onTouched();
            })
        )
    }
    onAdd() {
        this.isForm = !this.isForm;
    }
    
    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
    writeValue(value: any): void {
        if (value) this.value = value;
        if (value === null) { this.staffForm.reset(); }
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    // ngOnInit(): void {
    // }
    get staffs() {
        return this.staffForm.controls["stores"] as FormArray;
    }
    onChange: any = () => { };
    onTouched: any = () => { };

    //  inner form validation to the parent form
    validate(_: FormControl) {
        return this.staffForm.valid ? null : { profile: { valid: false } };
    }

}
