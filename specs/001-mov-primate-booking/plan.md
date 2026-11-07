# Implementation Plan: Plataforma de reservas del gimnasio MovPrimate

**Branch**: `001-mov-primate-booking` | **Date**: 2026-11-04 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-mov-primate-booking/spec.md`

## Summary

La aplicación de MovPrimate debe exponer una landing page pública para captar clientes y un flujo claro para que un alumno cree su cuenta, consulte disponibilidad y reserve sesiones de 1 hora. El flujo debe mantener un modelo de roles explicitamente diferenciado entre alumno, administrador/profesor y superadmin, con validación de reservas por parte del personal autorizado y sin depender de WhatsApp ni canales externos para la operación principal. Además, el superadmin debe poder gestionar roles y convertir usuarios de alumno a profesor o administrador cuando el negocio lo requiera.

## Technical Context

**Language/Version**: TypeScript, Angular 21

**Primary Dependencies**: Angular 21, Bootstrap, RxJS, Angular Router, HttpClient, NestJS API/BFF contracts

**Storage**: MongoDB (persisted in downstream services), frontend state in Angular app

**Testing**: Angular testing utilities, component tests, E2E tests (Cypress or Playwright if chosen by team)

**Target Platform**: Web frontend hosted in AWS-compatible environment, local execution via Docker Compose

**Project Type**: Web application

**Performance Goals**: Fast navigation, quick booking flow, responsive UI for desktop and mobile

**Constraints**:
- Landing page must remain publicly accessible without authentication
- Booking flow must require authenticated student account
- Admin/professor validation requires explicit authorization
- Superadmin must have global oversight and role-management capability
- User registration defaults to student role, but role reassignment is allowed only by the superadmin
- No WhatsApp or external operational coordination for the core booking flow

**Scale/Scope**:
- Public landing page
- Student account/auth flow
- Booking availability and 1-hour reservation process
- Admin review and approval/rejection
- Superadmin dashboard and role management
- Role-aware UI states and contracts with BFF/API

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Public landing page is accessible without authentication: PASS
- Roles are explicit and distinct: alumno, administrador/profesor, superadmin: PASS
- Default role for new users is alumno, but superadmin can promote them to professor/admin: PASS
- Booking flow is centered on student experience and does not depend on WhatsApp: PASS
- Contracts with BFF/API remain stable and explicit: PASS
- Domain ownership remains separated from frontend UI logic: PASS
- No constitutional violations identified

## Project Structure

### Documentation (this feature)

```text
specs/001-mov-primate-booking/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
└── tasks.md
```

### Source Code (repository root)

```text
apps/
├── web/
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/
│   │   │   │   ├── auth/
│   │   │   │   ├── guards/
│   │   │   │   ├── interceptors/
│   │   │   │   └── services/
│   │   │   ├── features/
│   │   │   │   ├── landing/
│   │   │   │   ├── auth/
│   │   │   │   ├── bookings/
│   │   │   │   ├── admin/
│   │   │   │   ├── superadmin/
│   │   │   │   └── roles/
│   │   │   └── shared/
│   │   └── styles/
│   └── tests/
└── e2e/
```

**Structure Decision**: The app will be organized by vertical feature domains: landing, auth, bookings, admin, superadmin, and role-management, with shared infrastructure under core and shared modules.

## Complexity Tracking

No constitutional violations were identified, so no complexity exceptions are required.

## Addendum de alcance obligatorio

La implementación de app debe incluir:

- Gestión de 4 roles (`superadmin`, `admin`, `alumno`, `usuario`) con vistas y menús diferenciados.
- Flujo de reserva con fecha/hora + selección obligatoria de profesor.
- Bloqueo de cupos completos (4 alumnos por clase).
- Restricción de anulación hasta 1 hora antes.
- Perfil con contador e historial de reservas.
- Menú de asistencia para admin y panel de asistencia total para superadmin.
- Estados y notificación por correo reflejados en la UI (`pendiente`, `confirmado`, `cancelado`, `rechazado`).
