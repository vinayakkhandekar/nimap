import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
url="http://localhost:3000/user2"
  constructor(private http:HttpClient) { }
  getEmployees() {
    return this.http.get<Employee[]>(this.url);
  }
  postEmployee(employee: Employee) {
    return this.http.post<Employee>(this.url, employee);
  }

  deleteEmployee(id: string) {
    return this.http.delete(this.url + '/' + id);
  }
}
