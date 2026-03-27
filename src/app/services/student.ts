import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl = 'http://localhost:8080/api/students';

  constructor(private http: HttpClient) {}

  getStudents() {
    return this.http.get(this.baseUrl);
  }

  addStudent(data: any) {
    return this.http.post(this.baseUrl, data);
  }

  deleteStudent(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  updateStudent(id: number, data: any) {
  return this.http.put(`${this.baseUrl}/${id}`, data);
}
}