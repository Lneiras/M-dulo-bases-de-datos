-- este archivo tiene los datos que fueron insertados a las tablas de la base de datos

-- 1. información de los docentes
INSERT INTO docentes (nombre_completo, correo_institucional, departamento_academico, anios_experiencia) VALUES
('Carlos Mendoza', 'cmendoza@univ.edu', 'Ingeniería', 8),
('Ana Ríos', 'arios@univ.edu', 'Ciencias', 4),
('Luis Gómez', 'lgomez@univ.edu', 'Ingeniería', 12);

-- 2. información de los Cursos 
INSERT INTO cursos (nombre, codigo, creditos, semestre, id_docente) VALUES
('Bases de Datos I', 'BD101', 4, 2, 1),
('Programación Avanzada', 'PRG202', 4, 3, 3),
('Cálculo Diferencial', 'MAT101', 3, 1, 2),
('Álgebra Lineal', 'MAT102', 3, 2, 2);

-- 3. información de los estudiantes 
INSERT INTO estudiantes (nombre_completo, correo_electronico, genero, identificacion, carrera, fecha_nacimiento, fecha_ingreso) VALUES
('Juan Pérez', 'juan@mail.com', 'M', '1010', 'Sistemas', '2002-05-12', '2021-02-01'),
('María López', 'maria@mail.com', 'F', '2020', 'Sistemas', '2003-08-22', '2022-01-15'),
('Pedro Pasos', 'pedro@mail.com', 'M', '3030', 'Industrial', '2001-03-30', '2020-08-10'),
('Lucía Fernández', 'lucia@mail.com', 'F', '4040', 'Sistemas', '2004-01-05', '2023-01-20'),
('Diego Torres', 'diego@mail.com', 'M', '5050', 'Industrial', '2002-11-11', '2021-08-05');

-- 4. información de los inscripciones 
INSERT INTO inscripciones (id_estudiante, id_curso, fecha_inscripcion, calificacion_final) VALUES
(1, 1, '2026-02-01', 4.5), 
(1, 2, '2026-02-01', 3.8),
(2, 1, '2026-02-01', 4.2), 
(2, 3, '2026-02-01', 2.9),
(3, 2, '2026-02-01', 4.0), 
(3, 4, '2026-02-01', 4.8),
(4, 1, '2026-02-01', 3.5), 
(5, 4, '2026-02-01', 3.0);