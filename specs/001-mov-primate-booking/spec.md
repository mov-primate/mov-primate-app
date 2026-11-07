# Feature Specification: Plataforma de reservas del gimnasio MovPrimate

**Feature Branch**: `001-mov-primate-booking`

**Created**: 2026-11-03

**Status**: Draft

**Input**: User description: "Define la plataforma de reservas para MovPrimate, un gimnasio que necesita un sitio web con landing page publicitaria y un sistema de agendamiento para alumnos. Los alumnos deben poder reservar sesiones de 1 hora. Los administradores deben validar, aprobar o rechazar las reservas desde la misma plataforma. El sistema debe evitar depender de WhatsApp o mensajes externos. El front end será Angular 21, el backend NestJS 12, la base de datos MongoDB, la infraestructura local será Docker y el despliegue objetivo será AWS."

## User Scenarios & Testing

### User Story 1 - Cliente potencial visita la landing page (Priority: P1)
Un visitante llega a la plataforma de MovPrimate y entiende la propuesta del gimnasio, los servicios, la experiencia y la forma de agendar una sesión o iniciar contacto con la marca.

**Why this priority**: La conversión inicial depende de que el usuario comprenda la propuesta y encuentre un camino claro hacia la reserva o la consulta.

**Independent Test**: Un visitante no autenticado puede abrir la landing page y ver la identidad del gimnasio, servicios, beneficios y CTA sin depender de canales externos.

**Acceptance Scenarios**:
1. **Given** que el usuario accede a la landing page, **When** navega por las secciones, **Then** ve la propuesta de valor, servicios, estilo de trabajo y una llamada a la acción clara.
2. **Given** que el usuario desea reservar o consultar, **When** hace clic en el CTA, **Then** es dirigido al flujo de registro o de reserva.

---

### User Story 2 - Alumno crea su cuenta y agenda una sesión de 1 hora (Priority: P1)
Un alumno crea o ingresa a su cuenta y reserva una sesión disponible de 1 hora desde la plataforma.

**Why this priority**: La reserva es el proceso central del negocio y debe ser claro, seguro y extensible para el resto del sistema.

**Independent Test**: Un alumno autenticado puede seleccionar un slot disponible y completar una reserva en la misma plataforma sin usar WhatsApp ni mensajes externos.

**Acceptance Scenarios**:
1. **Given** que el alumno tiene una cuenta válida y está autenticado, **When** elige un horario disponible, **Then** la plataforma crea una reserva en estado pendiente.
2. **Given** que un horario ya está ocupado o reservado, **When** intenta agendarlo, **Then** el sistema bloquea la operación y muestra el slot como no disponible.
3. **Given** que el alumno intenta duplicar una reserva exacta, **When** confirma la acción, **Then** el sistema rechaza la operación por conflicto o duplicado.

---

### User Story 3 - Profesor/administrador valida la reserva (Priority: P1)
Un profesor o administrador revisa las solicitudes pendientes y aprueba o rechaza la sesión según la disponibilidad y el criterio del negocio.

**Why this priority**: La validación por administración es la capa de control que evita errores operativos y asegura la integridad del calendario.

**Independent Test**: Un administrador puede revisar todas las reservas pendientes, validar sus detalles y aprobar o rechazar desde la misma plataforma.

**Acceptance Scenarios**:
1. **Given** que existe una reserva pendiente, **When** el administrador la aprueba, **Then** el estado cambia a confirmada y queda visible para el alumno.
2. **Given** que existe una reserva pendiente, **When** el administrador la rechaza, **Then** el sistema cambia el estado a rechazada y notifica al alumno.
3. **Given** que un usuario no autorizado intenta validar reservas, **When** ejecuta la acción, **Then** el sistema le niega el acceso por falta de permisos.

---

### User Story 4 - Superadmin del gimnasio supervisa la operación y gestiona roles (Priority: P1)
El dueño del gimnasio, como superadmin, tiene visibilidad global de alumnos, profesores y reservas para controlar excepciones y asegurar orden operativo. Además, puede asignar roles clave para la operación del gimnasio, por ejemplo convertir un usuario alumno en profesor/administrador cuando el negocio lo requiera.

**Why this priority**: El dueño requiere capacidad de supervisión, control operativo y gestión explícita de roles sin depender de terceros ni de canales no registrados.

**Independent Test**: El superadmin puede acceder a datos globales de usuarios, reservas y validaciones, y cambiar el rol de un usuario cuando una decisión de negocio lo requiera.

**Acceptance Scenarios**:
1. **Given** que el superadmin entra al panel, **When** consulta la operación, **Then** ve reservas, estados y usuarios por rol.
2. **Given** que un usuario nuevo se crea como alumno por defecto, **When** el superadmin decide asignarle perfil de profesor, **Then** el rol cambia explícitamente y la plataforma refleja el nuevo acceso y permisos.
3. **Given** que hay una excepción de negocio o conflicto, **When** el superadmin actúa, **Then** su acción queda autorizada y registrada.

---

### User Story 5 - Alumno revisa su estado e historial (Priority: P2)
El alumno consulta su historial de reservas y el estado actual de cada sesión agendada.

**Why this priority**: La transparencia reduce contacto externo y mejora la confianza del usuario.

**Independent Test**: El alumno autenticado puede revisar el estado de cada reserva y el historial de sesiones desde su panel.

**Acceptance Scenarios**:
1. **Given** que el alumno tiene una reserva, **When** entra a su historial, **Then** ve la información del slot, la fecha, el estado y el resultado de validación.
2. **Given** que la reserva fue confirmada o rechazada, **When** abre la detalle, **Then** entiende el resultado y el siguiente paso.

---

### User Story 6 - Sistema informa al usuario por la plataforma (Priority: P2)
La plataforma comunica por notificaciones internas o email/alertas del sistema el resultado de la reserva y sus cambios de estado.

**Why this priority**: El negocio requiere un canal estructurado y auditado para comunicar las decisiones sin depender de WhatsApp.

**Independent Test**: Cuando se crea o actualiza una reserva, el sistema genera una notificación o mensaje visible desde la plataforma para el alumno y/o administrador correspondiente.

**Acceptance Scenarios**:
1. **Given** que una reserva se crea, **When** el sistema la procesa, **Then** el alumno recibe una confirmación o un aviso de pendiente.
2. **Given** que la reserva cambia de estado, **When** la operación es validada, **Then** el usuario afectado recibe la notificación correspondiente.

### Edge Cases

- ¿Qué ocurre si un alumno intenta reservar un slot mientras otro alumno ya lo tiene asignado?
- ¿Cómo reacciona el sistema si el alumno envía una segunda solicitud para el mismo horario?
- ¿Qué pasa si un administrador aprueba o rechaza una reserva ya revisada?
- ¿Cómo se comporta la plataforma si se intenta reservar un slot bloqueado o no disponible?
- ¿Qué ocurre cuando un superadmin debe intervenir en un caso de conflicto operativo?
- ¿Cómo responde el sistema si el superadmin convierte un alumno en profesor o viceversa?
- ¿Qué ocurre si se intenta cambiar un rol sin que exista una justificación o permiso explícito del superadmin?

## Requirements

### Functional Requirements

- **FR-001**: El sistema DEBE mostrar una landing page pública del gimnasio con propuesta de valor, servicios, estilo y llamado a la acción.
- **FR-002**: El sistema DEBE permitir que el alumno cree o use una cuenta válida para reservar sesiones.
- **FR-003**: El sistema DEBE diferenciar claramente entre roles de alumno, administrador/profesor y superadmin.
- **FR-004**: El sistema DEBE mostrar horarios disponibles para la sesión de 1 hora.
- **FR-005**: El alumno DEBE poder reservar una sesión con duración de 1 hora.
- **FR-006**: El sistema DEBE prevenir solapamientos, duplicados y reservas inválidas en el mismo horario.
- **FR-007**: Cada reserva DEBE tener estados claros, por ejemplo pendiente, confirmada, rechazada y cancelada.
- **FR-008**: El sistema DEBE permitir que un administrador/profesor revise y valide reservas pendientes.
- **FR-009**: El sistema DEBE permitir que un superadmin supervise la operación global y resuelva excepciones.
- **FR-010**: El sistema DEBE permitir que el superadmin cambie el rol de un usuario existente entre alumno y administrador/profesor, cuando el negocio lo requiera.
- **FR-011**: El sistema DEBE informar al alumno del resultado de la reserva a través de la plataforma.
- **FR-012**: El sistema DEBE mantener un historial de reservas por alumno y por operación.
- **FR-013**: Las acciones de administración y de superadmin DEBEN requerir autorización explícita y permisos definidos.
- **FR-014**: Todo cambio de rol DEBE quedar registrado con trazabilidad y validación del superadmin.
- **FR-015**: El sistema DEBE mantener contratos consistentes entre frontend, BFF y servicios, con validaciones de negocio explícitas.
- **FR-016**: La plataforma NO DEBE depender de WhatsApp, mensajes externos o coordinación manual para el proceso principal de reserva.
- **FR-017**: El sistema DEBE crear usuarios con rol inicial "usuario" (estado no autenticado con permisos limitados); solo superadmin puede promover a "alumno" o "admin".
- **FR-018**: El sistema DEBE enviar notificaciones por email (confirmación de entrega) + in-app (feedback real-time) cuando la reserva cambia de estado (pendiente, confirmado, cancelado, rechazado).

### Key Entities

- **Alumno**: usuario con perfil, historial y capacidad de reservar sesiones.
- **Administrador/Profesor**: usuario con permisos para revisar y aprobar o rechazar reservas.
- **Superadmin**: dueño del gimnasio con visión global, permisos de supervisión y control del sistema.
- **Reserva**: sesión de 1 hora con fecha, horario, alumno, estado, observaciones y validación asociada.
- **Slot/horario**: franja horaria disponible o bloqueada dentro del calendario.
- **Notificación**: mensaje interno o de sistema que informa el estado de la reserva.
- **Landing Page/Servicio**: información pública del gimnasio y su oferta comercial.

## Success Criteria

### Measurable Outcomes

- **SC-001**: Un alumno puede crear su cuenta y completar una reserva válida en menos de 3 minutos.
- **SC-002**: Ninguna reserva superpuesta o duplicada es aceptada para el mismo slot.
- **SC-003**: Un administrador puede revisar, aprobar y rechazar reservas desde la misma plataforma sin usar canales externos.
- **SC-004**: El superadmin puede supervisar generalidades del sistema y resolver excepciones operativas con auditoría.
- **SC-005**: Al menos el 90% de los flujos principales del proceso de reserva se completan sin intervención manual por WhatsApp u otros canales externos.
- **SC-006**: La landing page comunica claramente la propuesta de valor del gimnasio y la ruta de reserva para nuevos visitantes.

## Assumptions

- Los usuarios tienen conexión estable a internet.
- El primer lanzamiento cubre una sola sede o calendario principal del gimnasio.
- La autenticación y la autorización deben soportar roles diferenciados: alumno, administrador/profesor y superadmin.
- El sistema usa notificaciones internas o por correo del sistema como canal principal.
- La persistencia de MongoDB es aceptable para la versión inicial.
- El flujo principal no requiere integración con WhatsApp ni mensajería externa.

## Clarifications

### Session 2026-11-05

- Q1: Overlap rule (FR-006): "No duplicates/overlaps" → A: Exact slot only (same {date, time, professor}). Student cannot book the same exact slot twice; other slots (different time or professor) are allowed.
- Q2: Audit trail (FR-014): What info logged and who accesses? → A: Full audit to superadmin only. Log {timestamp, old_role, new_role, superadmin_id, reason, signature}. Only superadmin can view complete log.
- Q3: Cancellation timezone (T043): Which timezone for "1 hour before" rule? → A: Server timezone (gym's timezone). All time calculations use server-configured timezone; single source of truth for business rules.
- Q4: Attendance marking window (T044): When can admin mark attendance? → A: Always available. Attendance can be marked any time after session starts; provides maximum flexibility for gym staff.
- Q5: Notification strategy (T050): Email vs in-app notifications? → A: Email primary + in-app secondary. Always send email (confirmed delivery); also show in-app banner/notification center for real-time feedback.

## Reglas globales obligatorias (actualización)

Estas reglas reemplazan cualquier ambigüedad previa en la app:

- Roles del sistema: `superadmin`, `admin` (profesor), `alumno`, `usuario`.
- Todo registro nuevo entra como `usuario`; el `superadmin` puede promover a `alumno` o `admin` y desactivar usuarios.
- `alumno` reserva clases de 1 hora en calendario (fecha/hora), con selección obligatoria de profesor (`admin`).
- Un `alumno` no puede duplicar o solapar reservas propias: restricción por slot exacto. No puede reservar el mismo {fecha, hora, profesor} dos veces. Otros slots (diferente hora o profesor) están permitidos.
- Cada clase admite máximo 4 alumnos; con cupo lleno se bloquea/no se muestra disponible.
- Estados de reserva visibles en UI: `pendiente`, `confirmado`, `cancelado`, `rechazado`.
- La reserva solo puede anularse hasta 1 hora antes de la hora agendada, según timezone del servidor (hora del gimnasio).
- Perfil de usuario con contador de reservas e historial de reservas.
- Menú de `admin` para asistencia: `asistió`, `no asistió`, `justificó ausencia`. Marcable en cualquier momento después del inicio de la sesión.
- Panel `superadmin` con revisión de reservas y total de clases asistidas por alumno.
- Audit trail para cambios de rol: {timestamp, old_role, new_role, superadmin_id, reason, signature}. Solo superadmin puede acceder al log completo.
- Notificaciones: Email primaria (confirmación de entrega) + in-app secundaria (feedback en tiempo real). Se envían cuando reserva cambia estado (pendiente/confirmado/cancelado/rechazado).
