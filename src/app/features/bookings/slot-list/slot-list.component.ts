import { Component, inject, signal, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BffApiService } from '../../../core/services/bff-api.service';
import { SlotModel } from '../../../shared/models/slot.model';

@Component({
  selector: 'app-slot-list',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './slot-list.component.html',
})
export class SlotListComponent {
  private readonly api = inject(BffApiService);

  protected date = '';
  protected professorId = '';
  protected readonly slots = signal<SlotModel[]>([]);
  protected readonly loading = signal(false);
  protected readonly error = signal('');

  readonly slotSelected = output<SlotModel>();

  protected search(): void {
    if (!this.date || !this.professorId) { this.error.set('Selecciona fecha y profesor'); return; }
    this.loading.set(true);
    this.error.set('');
    this.api.getSlots(this.date, this.professorId).subscribe({
      next: slots => { this.slots.set(slots); this.loading.set(false); },
      error: () => { this.error.set('Error al cargar slots'); this.loading.set(false); },
    });
  }

  protected select(slot: SlotModel): void {
    if (slot.available) this.slotSelected.emit(slot);
  }
}
