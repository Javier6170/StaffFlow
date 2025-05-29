import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../../core/service/auth/person.service';

@Component({
  selector: 'app-person-register',
  standalone: false,
  templateUrl: './person-register.component.html',
  styleUrl: './person-register.component.css'
})
export class PersonRegisterComponent {
  personForm!: FormGroup;
  isEditMode = false;
  personId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private personsService: PersonService
  ) { }

  ngOnInit(): void {
    this.personForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      position: [''],
      department: [''],
      hireDate: [''],
      salary: ['']
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.personId = id;
        this.loadPerson(id);
      }
    });
  }

  loadPerson(id: string): void {
    this.personsService.getById(id).subscribe((person: { [key: string]: any; }) => {
      this.personForm.patchValue(person);
    });
  }

  onSubmit(): void {
    if (this.personForm.invalid) return;

    if (this.isEditMode) {
      this.personsService.update(this.personId, this.personForm.value).subscribe(() => {
        this.router.navigate(['/persons']);
      });
    } else {
      this.personsService.create(this.personForm.value).subscribe(() => {
        this.router.navigate(['/persons']);
      });
    }
  }
}
