# Requirements Quality Checklist: Plataforma de reservas del gimnasio MovPrimate

**Purpose**: Validar la calidad y completitud del requisito de producto para la experiencia de reserva en Angular.
**Created**: 2026-11-04
**Feature**: [spec.md](./spec.md)

**Review Ownership**: Este checklist es un artefacto de revisión de calidad del requisito. Solo se marca `[x]` cuando el criterio queda validado.

## Experiencia del cliente y negocio

- [ ] CHK001 La landing page expone propuesta de valor, servicios y CTA claro para captar clientes.
- [ ] CHK002 El flujo de alumno requiere cuenta y autenticación explícita antes de reservar.
- [ ] CHK003 Los slots se presentan solo con horarios válidos y no disponibles según el contrato.
- [ ] CHK004 La reserva de 1 hora se crea como una operación principal con estado inicial pendiente.
- [ ] CHK005 La reserva se valida contra reglas de negocio y no depende de WhatsApp ni coordinación externa.
- [ ] CHK006 El alumno cuenta con una experiencia clara para consultar su historial y el detalle de su reserva.
- [ ] CHK007 El superadmin puede reasignar roles y convertir usuarios de alumno a profesor/admin cuando el negocio lo requiere.

## Seguridad y permisos

- [ ] CHK008 El sistema distingue claramente alumno, administrador/profesor y superadmin.
- [ ] CHK009 Las acciones sensibles de validación requieren permisos explícitos y no visibles para usuarios no autorizados.
- [ ] CHK010 El cambio de rol se realiza solo por el superadmin y queda registrado con trazabilidad.
- [ ] CHK011 El flujo de admin muestra solo reservas pendientes y acciones permitidas para su rol.
- [ ] CHK012 El superadmin tiene acceso global supervisado y sin exposición de datos no autorizados.

## Consistencia de contratos

- [ ] CHK013 El frontend usa contratos definidos con BFF/API para autenticación, disponibilidad y reservas.
- [ ] CHK014 Los estados de reserva y los errores de dominio están alineados con la capa de backend.
- [ ] CHK015 La experiencia del usuario para aprobar o rechazar reservas es consistente con la capa de negocio.
- [ ] CHK016 Los errores de validación, permisos y conflicto se muestran con mensajes claros en la UI.

## Calidad operativa

- [ ] CHK017 La app soporta escenarios de error sin depender de canales externos.
- [ ] CHK018 La experiencia de reserva mantiene un flujo claro desde landing hasta validación final.
- [ ] CHK019 La solución es compatible con la arquitectura local Docker y el despliegue objetivo en AWS.
- [ ] CHK020 El flujo principal se puede revisar como un MVP funcional sin mezclar responsabilidades entre frontend y dominio.

## Notes

- Solo marcar `[x]` cuando la revisión confirma que el criterio de calidad es correcto.
- Dejar sin marcar si todavía requiere aclaración, ajuste o validación adicional.
- Este artefacto no sustituye la implementación; valida la calidad de requerimientos antes de codificar.

## Reglas globales a verificar

- [ ] CHK021 Existen 4 roles visibles y funcionales: superadmin, admin, alumno, usuario.
- [ ] CHK022 Nuevo registro inicia como usuario; superadmin puede reasignar rol y desactivar usuarios.
- [ ] CHK023 Alumno reserva en calendario con fecha/hora y selección obligatoria de profesor.
- [ ] CHK024 No se permiten reservas duplicadas/solapadas del mismo alumno.
- [ ] CHK025 Se bloquean horarios con cupo completo (4 alumnos).
- [ ] CHK026 Estados de reserva: pendiente, confirmado, cancelado, rechazado.
- [ ] CHK027 Solo se permite anulación hasta 1 hora antes.
- [ ] CHK028 Perfil muestra contador + historial de reservas.
- [ ] CHK029 Admin tiene menú de asistencia (asistió/no asistió/justificó ausencia).
- [ ] CHK030 Superadmin tiene panel con total de clases asistidas por alumno.
- [ ] CHK031 Se refleja confirmación por correo según estado de reserva.
