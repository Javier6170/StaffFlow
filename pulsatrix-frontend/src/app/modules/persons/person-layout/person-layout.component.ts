import { Component } from '@angular/core';
import { PersonService } from '../../../core/service/auth/person.service';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-person-layout',
  standalone: false,
  templateUrl: './person-layout.component.html',
  styleUrl: './person-layout.component.css'
})
export class PersonLayoutComponent {
  persons: any[] = [];
  loading = false;
  isChildRoute = false;

  constructor(
    private personService: PersonService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((segments: UrlSegment[]) => {
      const path = segments.map(s => s.path).join('/');
      this.isChildRoute = path.includes('create') || path.includes('edit');
    });

    if (!this.isChildRoute) this.fetchPersons();
  }

  fetchPersons(): void {
    this.loading = true;
    this.personService.getAll().subscribe({
      next: (res) => {
        this.persons = res.data || res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching persons:', err);
        this.loading = false;
      }
    });
  }

  
}
