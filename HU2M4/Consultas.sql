-- en este archivo se encuentran las consultas que se realizaron a la base de datos

--Listar todos los estudiantes con sus inscripciones y cursos (JOIN).

SELECT e.nombre_completo, c.nombre AS curso, i.calificacion_final 
FROM estudiantes e
INNER JOIN inscripciones i ON e.id_estudiante = i.id_estudiante
INNER JOIN cursos c ON i.id_curso = c.id_curso;

--Listar cursos dictados por docentes con > 5 años de experiencia.

SELECT c.nombre AS curso, d.nombre_completo AS docente, d.anios_experiencia
FROM cursos c
INNER JOIN docentes d ON c.id_docente = d.id_docente
WHERE d.anios_experiencia > 5;

--Obtener promedio de calificaciones por curso (GROUP BY + AVG).

SELECT c.nombre AS curso, ROUND(AVG(i.calificacion_final), 2) AS promedio
FROM cursos c
LEFT JOIN inscripciones i ON c.id_curso = i.id_curso
GROUP BY c.id_curso, c.nombre;

--Mostrar estudiantes inscritos en más de un curso (HAVING COUNT(*) > 1).

SELECT e.nombre_completo, COUNT(i.id_curso) AS total_cursos
FROM estudiantes e
INNER JOIN inscripciones i ON e.id_estudiante = i.id_estudiante
GROUP BY e.id_estudiante, e.nombre_completo
HAVING COUNT(i.id_curso) > 1;

--ALTER TABLE: agregar columna estado_academico a estudiantes.

ALTER TABLE estudiantes ADD COLUMN estado_academico VARCHAR(20) DEFAULT 'Regular';

--Eliminar un docente y observar el efecto en cursos (revisar ON DELETE en la FK).

DELETE FROM docentes WHERE id_docente = 1;

--Consultar cursos con más de 2 estudiantes inscritos (GROUP BY + COUNT + HAVING).

SELECT c.nombre AS curso, COUNT(i.id_estudiante) AS total_estudiantes
FROM cursos c
INNER JOIN inscripciones i ON c.id_curso = i.id_curso
GROUP BY c.id_curso, c.nombre
HAVING COUNT(i.id_estudiante) > 2;