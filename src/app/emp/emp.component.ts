import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-emp',
  templateUrl: './emp.component.html',
  styleUrls: ['./emp.component.css']
})
export class EmpComponent {
  @Input() employee: Employee ;
  /**
   *
   */
   @Output() onRemoveEmployee = new EventEmitter<number>();
   @Output() onEditEmployee = new EventEmitter<number>();
  constructor() {
    this.employee = {
      firstname: '',
      lastname: '',
      age: 0,
      phone:0,
      email: '',
      address: '',
      state: '',
      country: '',
      tags: '',
      profile: '',
    };
    
  }
  deleteEmployeeClicked() {
    this.onRemoveEmployee.emit(this.employee.id);
  }
  editEmployeeClicked(){
    this.onEditEmployee.emit(this.employee.id);
  }
}
