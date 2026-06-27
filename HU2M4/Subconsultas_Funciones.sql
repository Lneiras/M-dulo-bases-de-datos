
-- en este archivo se encuentran las subconsultas y funciones que se realizaron a la base de datos

-- 1. estudiantes con promedio mayor al promedio general de la universidad
SELECT e.nombre_completo, ROUND(AVG(i.calificacion_final), 2) AS promedio_estudiante
FROM estudiantes e
INNER JOIN inscripciones i ON e.id_estudiante = i.id_estudiante
GROUP BY e.id_estudiante, e.nombre_completo
HAVING AVG(i.calificacion_final) > (SELECT AVG(calificacion_final) FROM inscripciones);

-- 2. nombres de carreras con estudiantes inscritos en cursos del semestre >= 2 
SELECT DISTINCT e.carrera 
FROM estudiantes e
WHERE EXISTS (
    SELECT 1 
    FROM inscripciones i 
    INNER JOIN cursos c ON i.id_curso = c.id_curso
    WHERE i.id_estudiante = e.id_estudiante AND c.semestre >= 2
);

-- 3. indicadores globales
SELECT 
    ROUND(AVG(calificacion_final), 2) AS promedio_general,
    SUM(calificacion_final) AS suma_total_notas,
    MAX(calificacion_final) AS nota_mas_alta,
    MIN(calificacion_final) AS nota_mas_baja,
    COUNT(*) AS total_inscripciones_registradas
FROM inscripciones;