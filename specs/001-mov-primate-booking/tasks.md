# Tasks: Plataforma de reservas del gimnasio MovPrimate

**Input**: Design documents from `/specs/001-mov-primate-booking/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are optional for this feature but recommended for the main booking flow and role-gated actions.

**Organization**: Tasks are grouped by user story and implementation milestone.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel
- **[Story]**: Story owner (e.g., US1, US2, etc.)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare the Angular app structure and configuration for the booking feature

- [ ] T001 Create Angular project structure under `src/app/features` for landing, auth, booking, admin, superadmin, and role management
- [ ] T002 Configure routing, shared modules, and bootstrap layout
- [ ] T003 [P] Set up environment configuration for API/BFF endpoints
- [ ] T004 [P] Add base styling and reusable layout components for the app shell

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core UI infrastructure that enables all flows

- [ ] T005 Create auth state and session management for student users
- [ ] T006 [P] Implement API client and models for booking contracts
- [ ] T007 [P] Implement generic error and loading handling
- [ ] T008 Configure role-aware route guards and access control
- [ ] T009 Create shared components for cards, tables, forms, and notifications

**Checkpoint**: Foundation ready - the main feature flows can now begin.

---

## Phase 3: User Story 1 - Landing page pública (Priority: P1) 🎯 MVP

**Goal**: Exponer una propuesta clara del gimnasio y un CTA hacia el registro o la reserva

**Independent Test**: Un visitante no autenticado puede ver la landing page, la propuesta de valor y el CTA principal.

### Implementation for User Story 1

- [ ] T010 [P] [US1] Create landing page hero, services section, and CTA in `src/app/features/landing/`
- [ ] T011 [US1] Implement navigation and responsive sections for the public experience
- [ ] T012 [US1] Connect CTA to auth flow or booking entry flow
- [ ] T013 [US1] Add content validation and accessibility checks

**Checkpoint**: The public landing experience is functional and testable independently.

---

## Phase 4: User Story 2 - Alumno crea cuenta y reserva sesión de 1 hora (Priority: P1)

**Goal**: Enable student sign-in and booking flow without external messaging

**Independent Test**: Un alumno autenticado puede consultar disponibilidad y crear una reserva de 1 hora.

### Implementation for User Story 2

- [ ] T014 [P] [US2] Implement student login/registration forms in `src/app/features/auth/`
- [ ] T015 [P] [US2] Create profile/session state handling after login
- [ ] T016 [US2] Implement availability screen and slot selection in `src/app/features/bookings/`
- [ ] T017 [US2] Implement reservation creation with validation against business rules
- [ ] T018 [US2] Handle pending reservation state and UI feedback for duplicates/conflicts
- [ ] T019 [US2] Implement student reservation history and detail view

**Checkpoint**: Student reservation flow works independently and creates valid pending reservations.

---

## Phase 5: User Story 3 - Administrador valida la reserva (Priority: P1)

**Goal**: Give admin/professor role the ability to review and decide on pending bookings

**Independent Test**: Un administrador con permisos puede validar una reserva pendiente.

### Implementation for User Story 3

- [ ] T020 [P] [US3] Create admin dashboard with pending booking list in `src/app/features/admin/`
- [ ] T021 [US3] Implement reservation detail, status mapping, and approval/rejection actions
- [ ] T022 [US3] Enforce role guard and prevent unauthorized access
- [ ] T023 [US3] Show success and error states for validation actions
- [ ] T024 [US3] Connect the admin flow to BFF/API contract responses

**Checkpoint**: The admin validation flow is secure and testable.

---

## Phase 6: User Story 4 - Superadmin supervisa la operación y gestiona roles (Priority: P1)

**Goal**: Give the gym owner visibility and operational control, including explicit role assignment

**Independent Test**: El superadmin puede consultar usuarios, estados y reservas según permisos y reasignar un usuario de alumno a profesor/admin cuando el negocio lo requiera.

### Implementation for User Story 4

- [ ] T025 [P] [US4] Create superadmin dashboard in `src/app/features/superadmin/`
- [ ] T026 [US4] Implement overview of users, reservations, and per-role visibility
- [ ] T027 [US4] Add filters and exception monitoring for operational review
- [ ] T028 [US4] Restrict actions and data access based on app-level role rules
- [ ] T029 [US4] Implement role management in `src/app/features/roles/` to convert a user from alumno to profesor/admin and keep audit tracking
- [ ] T030 [US4] Validate that the role change is only allowed for the superadmin and is logged as an auditable action

**Checkpoint**: Superadmin view and role management are role-protected and operationally useful.

---

## Phase 7: User Story 5 - Alumno revisa historial y notificaciones (Priority: P2)

**Goal**: Keep the student informed about status and updates without external communication

**Independent Test**: El alumno puede revisar el historial actualizado y el estado final de cada reserva.

### Implementation for User Story 5

- [ ] T031 [P] [US5] Implement notification center or in-app status updates
- [ ] T032 [US5] Add status badges and timeline for reservation lifecycle
- [ ] T033 [US5] Connect reservation update events to UI refresh behavior
- [ ] T034 [US5] Ensure clear messages when a reservation is approved, rejected, or pending

**Checkpoint**: Student status updates are visible and understandable.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final validation, UX improvements, and quality checks

- [ ] T035 [P] Accessibility review across landing, auth, booking, admin, superadmin, and role management
- [ ] T036 [P] Responsive review for mobile and desktop
- [ ] T037 Error handling QA for empty states, failure responses, and permission denial
- [ ] T038 Run end-to-end flow validation: student registration → booking → admin validation → final status
- [ ] T039 Final documentation and quickstart validation for the app feature

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup**: No dependencies
- **Foundational**: Depends on Setup
- **User Story 1**: Depends on Foundational
- **User Story 2**: Depends on Foundational
- **User Story 3**: Depends on Foundational and US2
- **User Story 4**: Depends on Foundational and role model availability
- **User Story 5**: Depends on US2 and US3
- **Polish**: Depends on all user stories being complete

### Parallel Opportunities

- Setup tasks marked `[P]` can run in parallel
- Foundational tasks marked `[P]` can run in parallel
- US1 and US2 can be developed in parallel after foundational setup if team capacity allows
- Admin and superadmin views can be developed in parallel once role guards are ready
- Notification and history tasks can run alongside final polish

---

## Implementation Strategy

1. Complete foundational infrastructure and route guards
2. Deliver landing page MVP
3. Deliver student booking flow MVP
4. Validate admin approval/rejection flow
5. Finish superadmin oversight view and role-management feature
6. Complete notification/history UX
7. Run final end-to-end validation and polish

## Tareas globales obligatorias (complementarias)

- [ ] T040 Incorporar rol `usuario` como estado inicial del registro en frontend.
- [ ] T041 Agregar flujo de desactivación de usuario desde panel superadmin.
- [ ] T042 Asegurar selección obligatoria de profesor en creación de reserva.
- [ ] T043 Restringir anulación de reserva a ventanas >= 1 hora antes del inicio (usando timezone del servidor).
- [ ] T044 Implementar UI de asistencia para admin: asistió/no asistió/justificó ausencia (marcable en cualquier momento post-sesión).
- [ ] T045 Implementar panel superadmin con total de clases asistidas por alumno.
- [ ] T046 Reflejar estado de correo de confirmación en detalle de reserva.
- [ ] T047 [P] [US2] Implementar validación de cupo máximo (4 alumnos/profesor/horario) en disponibilidad y creación de reserva; bloquear slot cuando cupo esté lleno.
- [ ] T048 [P] [US3] Implementar ventana de anulación: validar en endpoint de cancelación que `now() < (start_time - 60 min)` según timezone del servidor; desactivar botón en UI si < 1h; mostrar error claro.
- [ ] T049 [US5] Implementar contador de reservas totales en perfil de alumno; actualizar en tiempo real cuando se crea/cancela reserva.
- [ ] T050 [US6] Integrar sistema de notificación por email + in-app: email confirmación de entrega (primaria), in-app banner/notification center (secundaria) cuando estado cambió a pendiente/confirmado/cancelado/rechazado.

---

## Clarifications Integration Notes

- **T047 (Cupo)**: Maps to FR-006, SC-002, global rule "4 alumnos máx". Implements hard constraint in both BFF/API and frontend.
- **T048 (Anulación)**: Maps to T043 expanded, clarified with server timezone. Affects both backend validation and frontend UX (button enable/disable).
- **T049 (Contador)**: Maps to global rule "Perfil con contador". Pure frontend data binding + subscription to reservation changes.
- **T050 (Notificaciones)**: Maps to FR-018 (new), clarified as "email primary + in-app secondary". Requires email service integration (can be BFF responsibility) and in-app notification center (frontend).

