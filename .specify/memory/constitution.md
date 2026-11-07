# Constitución de la App MovPrimate

## Principios fundamentales

### I. Experiencia de reserva clara y centrada en el alumno
La aplicación debe permitir crear una cuenta de alumno, iniciar sesión y reservar sesiones de 1 hora sin fricción, sin depender de WhatsApp ni de canales externos para la coordinación operativa. Cada usuario nuevo se registra como alumno por defecto, pero el superadmin puede reasignar ese usuario a un rol de profesor/administrador cuando el negocio lo amerite. El profesor debe tener un usuario administrador para aceptar las reservas. El dueño del gimnasio debe contar con un superadmin para controlar alumnos, profesores y decisiones críticas.

### II. Seguridad y privacidad por defecto
Toda acción administrativa o sensible debe estar protegida por autorización explícita. Los datos del alumno, del profesor, del dueño, de la reserva y de la operación no deben exponerse al público ni a usuarios no autorizados.

### III. Frontend orientado a la conversión, la claridad y los roles
La app debe comunicar la propuesta de valor del gimnasio, su estilo de trabajo y los servicios ofrecidos, sin perder la claridad del flujo de agendamiento ni la diferencia de permisos entre alumno, administrador y superadmin.

### IV. Contratos con el backend definidos y estables
La capa frontend debe consumir contratos claros del BFF y de los servicios. Cambios de interfaz, payloads y eventos deben gestionarse con revisión explícita antes de implementarse.

### V. Rendimiento, accesibilidad y calidad UX
La experiencia debe funcionar correctamente en navegadores modernos, con tiempos de carga razonables, feedback visual claro y un flujo accesible para usuarios con distintos niveles de experiencia digital.

## Restricciones del producto

- Stack frontend: Angular 21 + TypeScript + Bootstrap
- Infraestructura local: Docker Compose
- Persistencia del backend: MongoDB
- Target de despliegue: AWS
- El alumno debe poder crear o ingresar con una cuenta y agendar sesiones de 1 hora
- El profesor debe existir como administrador para validar reservas desde la plataforma
- El dueño del gimnasio debe existir como superadmin con supervisión global
- La app debe contener una vista pública de marca, servicios y experiencia del gimnasio
- El sistema no debe depender de mensajes externos para coordinar la reserva o la validación

## Flujo de trabajo de desarrollo

- Cada funcionalidad debe definirse con criterios de aceptación claros antes de implementarse.
- Las decisiones de UX y flujo deben validarse con escenarios reales de reserva, aprobación y supervisión por roles.
- Los cambios de contrato con el backend deben revisarse antes de fusionarse.
- La app debe mantener compatibilidad con el flujo general de Spec Kit: constitución, especificación, clarificación, planificación, tareas e implementación.

## Gobernanza

La app MovPrimate debe preservar una experiencia simple, legible y profesional para alumnos, administradores y superadmins. Cualquier cambio que degrade la claridad del flujo, la seguridad, los permisos o la coherencia del sistema debe corregirse antes de pasar a producción. Los cambios de rol, incluidos los ascensos de alumno a profesor o de profesor a alumno, deben hacerse solo por el superadmin y deben quedar registrados con trazabilidad.

**Versión**: 1.0.1 | **Ratificada**: 2026-11-03 | **Última modificación**: 2026-11-04
