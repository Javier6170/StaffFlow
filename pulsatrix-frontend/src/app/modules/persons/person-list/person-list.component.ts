import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../../core/service/auth/person.service';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';

interface Person {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  department: string;
  hireDate: string;
  salary: number;
}

@Component({
  selector: 'app-person-list',
  standalone: false,
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.css'
})
export class PersonListComponent implements OnInit{

  persons: Person[] = [];
  loading = false;
  isChildRoute = false;

  // Paginación
  page = 1;
  limit = 10;
  total = 0;
  totalPages = 0;
  limits = [5, 10, 20, 50];

  // Modal de detalle
  showModal = false;
  selectedPerson: Person | null = null;
  modalLoading = false;

  constructor(
    private personService: PersonService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Detectar si estamos en ruta hija (create/edit)
    this.route.url.subscribe((segments: UrlSegment[]) => {
      const path = segments.map(s => s.path).join('/');
      this.isChildRoute = path.includes('create') || path.includes('edit');
    });

    if (!this.isChildRoute) {
      this.fetchPersons();
    }
  }

  /** Traer lista paginada */
  fetchPersons(page: number = this.page, limit: number = this.limit) {
    this.loading = true;
    this.personService.getAll({ page, limit }).subscribe({
      next: res => {
        this.persons    = res.data;
        this.total      = res.meta.total;
        this.page       = res.meta.page;
        this.limit      = res.meta.limit;
        this.totalPages = res.meta.pages;
        this.loading    = false;
      },
      error: err => {
        console.error('Error fetching persons:', err);
        this.loading = false;
      }
    });
  }

  /** Navegar a crear */
  onCreate(): void {
    this.router.navigate(['create'], { relativeTo: this.route });
  }

  /** Navegar a editar */
  onEdit(id: string): void {
    this.router.navigate(['edit', id], { relativeTo: this.route });
  }

  /** Eliminar y refrescar lista */
  onDelete(id: string): void {
    if (!confirm('¿Estás seguro de eliminar esta persona?')) return;
    this.personService.delete(id).subscribe(() => this.fetchPersons());
  }

  // --------- Modal de Ver ---------

  /** Abrir modal y cargar detalle */
  onView(id: string): void {
    this.showModal = true;
    this.modalLoading = true;
    this.personService.getById(id).subscribe({
      next: res => {
        this.selectedPerson = res.data;
        this.modalLoading = false;
      },
      error: err => {
        console.error('Error fetching person detail:', err);
        this.selectedPerson = null;
        this.modalLoading = false;
      }
    });
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedPerson = null;
  }


  prevPage(): void {
    if (this.page > 1) {
      this.fetchPersons(this.page - 1, this.limit);
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.fetchPersons(this.page + 1, this.limit);
    }
  }

  onLimitChange(newLimit: number): void {
    this.limit = newLimit;
    this.fetchPersons(1, newLimit);
  }
}
