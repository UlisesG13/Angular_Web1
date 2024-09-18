import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { Person } from '../../models/person';

@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrl: './main-section.component.scss',
  standalone: true,
  imports: [
    AsyncPipe,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule
  ]
})
export class MainSectionComponent {

  personForm = new FormGroup({
    name: new FormControl('', { nonNullable: true }),
    apellido: new FormControl('', { nonNullable: true })
  });

  apellidosArray: string[] = [];
  personsArray: Person[] = [];
  private contador: number = 1;

  addApellido() {
    const apellido = this.personForm.get('apellido')?.value;
    if (apellido && !this.apellidosArray.includes(apellido)) {
      this.apellidosArray.push(apellido);
      this.personForm.get('apellido')?.reset(); 
    }
  }

  createPerson() {
    const name = this.personForm.get('name')?.value || '';
    const apellidos = [...this.apellidosArray]; 

    if (name && apellidos.length > 0) {
      const person: Person = {
        id: this.contador++,
        name,
        apellidos
      };
      this.personsArray.push(person);
      this.apellidosArray = []; 
      this.personForm.reset();
    }
  }

  deletePerson(id: number) {
    this.personsArray = this.personsArray.filter(person => person.id !== id);
  }

}
