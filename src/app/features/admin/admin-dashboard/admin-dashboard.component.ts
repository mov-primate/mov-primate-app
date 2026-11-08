import { Component, inject, signal, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BffApiService } from '../../../core/services/bff-api.service';
import { BookingModel } from '../../../shared/models/booking.model';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [DatePipe, StatusBadgeComponent, RouterLink],
  templateUrl: './admin-dashboard.component.html',
})
export class AdminDashboardComponent implements OnInit {
  private readonly api = inject(BffApiService);

  protected readonly bookings = signal<BookingModel[]>([]);
  protected readonly loading = signal(true);
  protected readonly msg = signal('');

  ngOnInit(): void {
    this.api.getPendingBookings().subscribe({
      next: b => { this.bookings.set(b); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  protected approve(id: string): void {
    this.api.approveBooking(id).subscribe({
      next: () => { this.remove(id); this.msg.set('Reserva aprobada ✅'); },
      error: () => this.msg.set('Error al aprobar.'),
    });
  }

  protected reject(id: string): void {
    this.api.rejectBooking(id, 'Rechazado por el profesor').subscribe({
      next: () => { this.remove(id); this.msg.set('Reserva rechazada.'); },
      error: () => this.msg.set('Error al rechazar.'),
    });
  }

  private remove(id: string): void {
    this.bookings.update(b => b.filter(bk => bk.id !== id));
  }
}
