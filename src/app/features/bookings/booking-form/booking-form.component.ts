import { Component, inject, signal, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BffApiService } from '../../../core/services/bff-api.service';
import { SlotModel } from '../../../shared/models/slot.model';
import { BookingModel } from '../../../shared/models/booking.model';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './booking-form.component.html',
})
export class BookingFormComponent {
  private readonly api = inject(BffApiService);

  readonly slot = input<SlotModel | null>(null);

  protected readonly booking = signal<BookingModel | null>(null);
  protected readonly loading = signal(false);
  protected readonly error = signal('');
  protected readonly success = signal(false);

  protected confirm(): void {
    const s = this.slot();
    if (!s) return;
    this.loading.set(true);
    this.error.set('');
    this.api.createBooking(s.professorId, s.startAt, s.endAt).subscribe({
      next: b => { this.booking.set(b); this.success.set(true); this.loading.set(false); },
      error: err => {
        const code = err?.error?.code ?? 'Error';
        this.error.set(code === 'ERR_NO_CLASSES_AVAILABLE'
          ? 'No tienes clases disponibles. Contacta al superadmin.'
          : code === 'ERR_BOOKING_CONFLICT'
          ? 'Ya tienes una reserva en ese horario.'
          : 'Error al crear la reserva. Intenta nuevamente.');
        this.loading.set(false);
      },
    });
  }
}
