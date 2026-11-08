import { Component, inject, signal, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BffApiService } from '../../../core/services/bff-api.service';
import { BookingModel } from '../../../shared/models/booking.model';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { SlotListComponent } from '../slot-list/slot-list.component';
import { BookingFormComponent } from '../booking-form/booking-form.component';
import { SlotModel } from '../../../shared/models/slot.model';

@Component({
  selector: 'app-booking-history',
  standalone: true,
  imports: [DatePipe, StatusBadgeComponent, SlotListComponent, BookingFormComponent],
  templateUrl: './booking-history.component.html',
})
export class BookingHistoryComponent implements OnInit {
  private readonly api = inject(BffApiService);

  protected readonly bookings = signal<BookingModel[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal('');
  protected readonly nextCursor = signal<string | undefined>(undefined);
  protected readonly selectedSlot = signal<SlotModel | null>(null);

  ngOnInit(): void { this.load(); }

  protected load(cursor?: string): void {
    this.loading.set(true);
    this.api.getBookingHistory(cursor).subscribe({
      next: res => {
        this.bookings.update(b => [...b, ...res.bookings]);
        this.nextCursor.set(res.nextCursor);
        this.loading.set(false);
      },
      error: () => { this.error.set('Error al cargar historial'); this.loading.set(false); },
    });
  }

  protected cancel(bookingId: string): void {
    this.api.cancelBooking(bookingId).subscribe({
      next: () => this.bookings.update(b => b.map(bk => bk.id === bookingId ? { ...bk, status: 'cancelado' as any } : bk)),
      error: err => alert(err?.error?.code === 'ERR_CANCELLATION_WINDOW' ? 'No puedes cancelar con menos de 1 hora de anticipación.' : 'Error al cancelar.'),
    });
  }

  protected onSlotSelected(slot: SlotModel): void {
    this.selectedSlot.set(slot);
  }
}
