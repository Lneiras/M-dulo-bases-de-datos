-- en este archivo se encuentran las tablas que se crearon para este ejercicio, con los diferentes datos que se van a manejar en la base de datos, para poder realizar las consultas y reportes que se requieran.

-- 1. Tabla Estudiantes
CREATE TABLE estudiantes (
    id_estudiante SERIAL PRIMARY KEY,  
    nombre_completo VARCHAR(100) NOT NULL,
    correo_electronico VARCHAR(100) UNIQUE NOT NULL,
    genero CHAR(1),
    identificacion VARCHAR(20) UNIQUE NOT NULL,
    carrera VARCHAR(50) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    fecha_ingreso DATE NOT NULL
);

-- 2. Tabla Docentes
CREATE TABLE docentes (
    id_docente SERIAL PRIMARY KEY,
    nombre_completo VARCHAR(100) NOT NULL,
    correo_institucional VARCHAR(100) UNIQUE NOT NULL,
    departamento_academico VARCHAR(50) NOT NULL,
    anios_experiencia INT CHECK (anios_experiencia >= 0)
);

-- 3. Tabla Cursos
CREATE TABLE cursos (
    id_curso SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    codigo VARCHAR(10) UNIQUE NOT NULL,
    creditos INT CHECK (creditos > 0),
    semestre INT NOT NULL,
    id_docente INT,
    FOREIGN KEY (id_docente) REFERENCES docentes(id_docente) ON DELETE SET NULL
);

-- 4. Tabla Inscripciones
CREATE TABLE inscripciones (
    id_inscripcion SERIAL PRIMARY KEY,
    id_estudiante INT NOT NULL,
    id_curso INT NOT NULL,
    fecha_inscripcion DATE NOT NULL,
    calificacion_final DECIMAL(3,2) CHECK (calificacion_final BETWEEN 0 AND 5),
    FOREIGN KEY (id_estudiante) REFERENCES estudiantes(id_estudiante) ON DELETE CASCADE,
    FOREIGN KEY (id_curso) REFERENCES cursos(id_curso) ON DELETE CASCADE
);