import { Injectable, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SessionModel } from '../../shared/models/user.model';
import { RoleEnum } from '../../shared/enums/role.enum';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly _session = signal<SessionModel | null>(null);

  readonly session = this._session.asReadonly();
  readonly isLoggedIn = computed(() => this._session() !== null);
  readonly role = computed(() => this._session()?.role ?? null);

  login(session: SessionModel): void {
    this._session.set(session);
    if (this.isBrowser) {
      sessionStorage.setItem('session', JSON.stringify(session));
    }
  }

  logout(): void {
    this._session.set(null);
    if (this.isBrowser) {
      sessionStorage.removeItem('session');
    }
  }

  restoreSession(): void {
    if (!this.isBrowser) return;
    const raw = sessionStorage.getItem('session');
    if (raw) {
      try { this._session.set(JSON.parse(raw)); } catch { this.logout(); }
    }
  }

  hasRole(...roles: RoleEnum[]): boolean {
    const r = this.role();
    return r !== null && roles.includes(r);
  }
}
