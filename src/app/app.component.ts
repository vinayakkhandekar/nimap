import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from './employee.model';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('fileInput') fileInput: any;
  @ViewChild('addEmployeeButton') addEmployeeButton: any;
  title = 'ptapp';
  /**
   *
   * 
   */
   employees: Employee[] |any ;
   employeesToDisplay: Employee[] | undefined;
  constructor( private fb: FormBuilder, private service:EmployeeService) {
    this.employees = [];
    this.employeesToDisplay = this.employees;

    this.employeeForm =new FormGroup({
      'firstname': new FormControl(null,Validators.required),
      'lastname': new FormControl('',Validators.required),
      'email': new FormControl('',Validators.required),
      'age': new FormControl('',Validators.required),
      ' phone': new FormControl('',Validators.required),
      'address': new FormControl('',Validators.required),
      'state': new FormControl('',Validators.required),
      'country': new FormControl('',Validators.required),
      'tags': new FormControl('',Validators.required)

      // firstname: this.fb.control('',Validators.required),
      // lastname: this.fb.control('',Validators.required),
      // email: this.fb.control('',Validators.required),
      // age: this.fb.control(''),
      // phone: this.fb.control('',Validators.required),
      // address: this.fb.control('',Validators.required),
      // state: this.fb.control(''),
      // country: this.fb.control(''),
      // tags:this.fb.control('',Validators.required)
    });
  }

  removeEmployee(event: any) {
    this.employees.forEach((val:any, index:number) => {
      if (val.id === parseInt(event)) {
        this.service.deleteEmployee(event).subscribe((res) => {
          this.employees.splice(index, 1);
        });
      }
    });
  }
  editEmployee(event: any) {
    this.employees.forEach((val:any, ind:number) => {
      if (val.id === event) {
        this.setForm(val);
      }
    });
    this.removeEmployee(event);
    this.addEmployeeButton.nativeElement.click();
  }
  setForm(emp: Employee) {
    this.FirstName.setValue(emp.firstname);
    this.LastName.setValue(emp.lastname);
    this.Age.setValue(emp.age);
    this.Address.setValue(emp.address);

    this.Email.setValue(emp.email)
this.tags.setValue(emp.tags)
    this.phone.setValue(emp.phone);
    this.state.setValue(emp.state);
    this.country.setValue(emp.country);
    this.fileInput.nativeElement.value = '';
  }

  clearForm() {
    this.FirstName.setValue('');
    this.LastName.setValue('');
    this.Age.setValue('');
    this.Email.setValue('');
    this.Address.setValue('');
    this.state.setValue('');
    this.country.setValue('');
    this.tags.setValue('');
    this.phone.setValue('');
    this.fileInput.nativeElement.value = '';
  }
  
  
  addEmployee() {
    let employee: Employee = {
      firstname: this.FirstName.value,
      lastname: this.LastName.value,
      age: this.Age.value,
      email: this.Email.value,
      address: this.Address.value,
      state: this.state.value,
      country: this.country.value,
      tags: this.tags.value,
      profile: this.fileInput.nativeElement.files[0]?.name,
      phone: this.phone.value
    };
    this.service.postEmployee(employee).subscribe((res) => {
      this.employees.unshift(res);
      this.clearForm();
    });
  }
  ngOnInit(): void {
    this.employees = [];
    this.employeesToDisplay = this.employees;
   
   this.service.getEmployees().subscribe((res) => {
    for (let emp of res) {
      this.employees.unshift(emp);
    }
    this.employeesToDisplay = this.employees;
  });
  }
  employeeForm: FormGroup ;

  public get FirstName(): FormControl {
    return this.employeeForm.get('firstname') as FormControl;
  }
  public get LastName(): FormControl {
    return this.employeeForm.get('lastname') as FormControl;
  }
  public get Age(): FormControl {
    return this.employeeForm.get('age') as FormControl;
  }
  public get Email(): FormControl {
    return this.employeeForm.get('email') as FormControl;
  }
  public get Address(): FormControl {
    return this.employeeForm.get('address') as FormControl;
  }
  public get state(): FormControl {
    return this.employeeForm.get('state') as FormControl;
  }
  public get country(): FormControl {
    return this.employeeForm.get('country') as FormControl;
  }
  public get tags(): FormControl {
    return this.employeeForm.get('tags') as FormControl;
  }
  public get phone(): FormControl {
    return this.employeeForm.get('tags') as FormControl;
  }
}
