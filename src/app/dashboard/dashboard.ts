import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FilterPipe } from '../filter-pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FilterPipe,FormsModule, CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'] 
})
export class Dashboard implements OnInit {

  students: any[] = [];

  name = '';
  email = '';
  course = '';
view: string = 'list';
editMode: boolean = false;
editId: number = 0;
searchText: string = '';
  constructor(
    private studentService: StudentService,
  private router: Router
  ) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getStudents().subscribe((res: any) => {
      this.students = res;
    });
  }
  editStudent(s: any) {
  this.name = s.name;
  this.email = s.email;
  this.course = s.course;

  this.editMode = true;
  this.editId = s.id;

  this.view = 'add'; // switch to form
}
resetForm() {
  this.name = '';
  this.email = '';
  this.course = '';
  this.editMode = false;
  this.loadStudents();
}
  addStudent() {
    const data = {
    name: this.name,
    email: this.email,
    course: this.course
  };

  if (this.editMode) {
    this.studentService.updateStudent(this.editId, data).subscribe(() => {
      alert('Student Updated');
      this.resetForm();
    });
  } else {
    this.studentService.addStudent(data).subscribe(() => {
      alert('Student Added');
      this.resetForm();
    });
  }
  }

  deleteStudent(id: number) {
    this.studentService.deleteStudent(id).subscribe(() => {
      alert('Deleted');
      this.loadStudents();
    });
  }
  logout() {
  // clear stored data
  localStorage.removeItem('user');

  alert('Logged out');

  this.router.navigate(['/']); // go to login
}
}