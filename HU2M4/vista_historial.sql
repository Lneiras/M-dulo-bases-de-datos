CREATE OR REPLACE VIEW vista_historial_academico AS
SELECT 
    e.nombre_completo AS estudiante, 
    c.nombre AS curso, 
    COALESCE(d.nombre_completo, 'Sin docente asignado') AS docente, 
    c.semestre, 
    i.calificacion_final
FROM estudiantes e
INNER JOIN inscripciones i ON e.id_estudiante = i.id_estudiante
INNER JOIN cursos c ON i.id_curso = c.id_curso
LEFT JOIN docentes d ON c.id_docente = d.id_docente;