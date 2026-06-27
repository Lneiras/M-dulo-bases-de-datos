

-- 1. Control de accesos (DCL)
-- Nota: En entornos reales necesitas permisos de superusuario para ejecutar esto.
DROP ROLE IF EXISTS revisor_academico;
CREATE ROLE revisor_academico;

-- Otorgar permiso de solo lectura sobre la vista
GRANT SELECT ON vista_historial_academico TO revisor_academico;

-- Revocar explícitamente permisos de modificación en inscripciones
REVOKE INSERT, UPDATE, DELETE ON inscripciones FROM revisor_academico;


-- 2. Simulación de transacciones (TCL)
BEGIN;

-- Modificación de calificación simulada 1
UPDATE inscripciones SET calificacion_final = 4.9 WHERE id_estudiante = 1 AND id_curso = 2;

-- Creamos un punto de salvaguarda
SAVEPOINT luego_de_actualizar_juan;

-- Modificación simulada 2 (Supongamos que fue un error de digitación)
UPDATE inscripciones SET calificacion_final = 1.5 WHERE id_estudiante = 3 AND id_curso = 4;

-- Deshacemos el error volviendo al punto anterior
ROLLBACK TO luego_de_actualizar_juan;

-- Confirmamos los cambios válidos definitivamente
COMMIT;