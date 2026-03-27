import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(students: any[], searchText: string): any[] {
    if (!students || !searchText) {
      return students;
    }

    searchText = searchText.toLowerCase();

    return students.filter(s =>
      s.name.toLowerCase().includes(searchText) ||
      s.email.toLowerCase().includes(searchText)
    );
  }
}