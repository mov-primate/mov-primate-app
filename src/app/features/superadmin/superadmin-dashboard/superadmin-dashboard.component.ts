import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BffApiService } from '../../../core/services/bff-api.service';
import { UserModel } from '../../../shared/models/user.model';

@Component({
  selector: 'app-superadmin-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './superadmin-dashboard.component.html',
})
export class SuperadminDashboardComponent implements OnInit {
  private readonly api = inject(BffApiService);

  protected readonly users = signal<UserModel[]>([]);
  protected readonly bookingCount = signal(0);
  protected readonly loading = signal(true);

  ngOnInit(): void {
    this.api.getDashboard().subscribe({
      next: d => { this.users.set(d.users ?? []); this.bookingCount.set(d.bookingCount ?? 0); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }
}
