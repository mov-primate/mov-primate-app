import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { RoleEnum } from '../../../shared/enums/role.enum';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <h2>Crear cuenta</h2>
        <p class="info">Los nuevos usuarios se registran como <strong>usuario</strong>. El superadmin puede promoverte a alumno una vez validado el pago.</p>
        <form (ngSubmit)="submit()">
          <div class="form-group">
            <label>Email</label>
            <input type="email" [(ngModel)]="email" name="email" placeholder="tu@email.com" required />
          </div>
          @if (error()) { <p class="error-msg">{{ error() }}</p> }
          <button type="submit" [disabled]="loading()" class="btn-primary">
            {{ loading() ? 'Registrando...' : 'Crear cuenta' }}
          </button>
        </form>
        <p class="auth-link">¿Ya tienes cuenta? <a routerLink="/auth/login">Inicia sesión</a></p>
      </div>
    </div>
  `,
})
export class RegisterComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected email = '';
  protected readonly loading = signal(false);
  protected readonly error = signal('');

  protected submit(): void {
    if (!this.email) { this.error.set('El email es requerido'); return; }
    this.loading.set(true);
    // New users start as 'usuario'
    this.auth.login({ userId: crypto.randomUUID(), email: this.email, role: RoleEnum.USUARIO });
    this.loading.set(false);
    this.router.navigate(['/bookings']);
  }
}
