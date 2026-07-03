
/*En este documento se agregaran los scripts utilizados en MongoDB para realizar el HU3M4*/

/*con esto seleccionamos la base de datos que vamos a utilizar*/
use('streamhub_db');


/*con esto creamos las tablas que vamos a utilizar*/
db.createCollection("usuarios");
db.createCollection("contenidos");
db.createCollection("valoraciones");


/*con esto insertamos datos en las tablas*/

/* con ObjectId("60c72b2f9b1d8b2bad111111") creamos un ID único*/

// los usuarios

/* En los usuario utilizamos insertMany y tambien utiliazmos insertOne */

//insertMany
db.usuarios.insertMany([
  { _id: ObjectId("60c72b2f9b1d8b2bad111111"), nombre: "Ana Gómez", email: "ana@email.com", historial_vistos: 6, suscripcion: "Premium", generos_favoritos: ["Sci-Fi", "Drama"] },
  { _id: ObjectId("60c72b2f9b1d8b2bad111112"), nombre: "Carlos Ruiz", email: "carlos@email.com", historial_vistos: 3, suscripcion: "Estándar", generos_favoritos: ["Acción"] },
  { _id: ObjectId("60c72b2f9b1d8b2bad111113"), nombre: "María López", email: "maria@email.com", historial_vistos: 12, suscripcion: "Premium", generos_favoritos: ["Comedia", "Sci-Fi"] }
]);


//insertOne
db.usuarios.insertOne({ _id: ObjectId("60c72b2f9b1d8b2bad111114"), 
nombre: "Laura Solano", email: "laura@email.com",
historial_vistos: 5, 
suscripcion: "Premium", 
generos_favoritos: ["Sci-Fi", "Drama", "Acción"] });


// los contenidos

db.contenidos.insertMany([
  {
    _id: ObjectId("60c72b2f9b1d8b2bad222221"),
    titulo: "Interstellar",
    tipo: "Película",
    duracion_min: 169,
    generos: ["Sci-Fi", "Drama"],
    anio: 2014,
    sinopsis: "Un grupo de científicos viaja a través de un agujero de gusano."
  },
  {
    _id: ObjectId("60c72b2f9b1d8b2bad222222"),
    titulo: "Mad Max: Fury Road",
    tipo: "Película",
    duracion_min: 120,
    generos: ["Acción", "Sci-Fi"],
    anio: 2015,
    sinopsis: "En un futuro post-apocalíptico, una mujer se rebela contra un tirano."
  },
  {
    _id: ObjectId("60c72b2f9b1d8b2bad222223"),
    titulo: "The Office",
    tipo: "Serie",
    duracion_min: 22,
    generos: ["Comedia"],
    anio: 2005,
    sinopsis: "El día a día de unos trabajadores de oficina muy particulares."
  }
]);

// las valoraciones

db.valoraciones.insertMany([
  { usuario_id: ObjectId("60c72b2f9b1d8b2bad111111"), contenido_id: ObjectId("60c72b2f9b1d8b2bad222221"), calificacion: 5, comentario: "Obra maestra de la ciencia ficción." },
  { usuario_id: ObjectId("60c72b2f9b1d8b2bad111113"), contenido_id: ObjectId("60c72b2f9b1d8b2bad222221"), calificacion: 4, comentario: "Excelente banda sonora." },
  { usuario_id: ObjectId("60c72b2f9b1d8b2bad111112"), contenido_id: ObjectId("60c72b2f9b1d8b2bad222222"), calificacion: 5, comentario: "Acción pura de principio a fin." }
]);

// CRUD

// Ver

// Películas con duración > 120 min
db.contenidos.find({
  tipo: "Película",
  duracion_min: { $gt: 120 } 
});

// Usuarios que vieron > 5 contenidos 
db.usuarios.find({
     historial_vistos: { $gt: 5 } 
});

// Contenidos que pertenezcan a los géneros 'Sci-Fi' o 'Comedia' 
db.contenidos.find({
  generos: { $in: ["Sci-Fi", "Comedia"] }
});

// Búsqueda por patrón de texto (Regex)
db.contenidos.find({
  titulo: { $regex: "office", $options: "i" }
});

// Contenidos que sean Películas Y duren menos de 130 min
db.contenidos.find({
  $and: [
    { tipo: "Película" },
    { duracion_min: { $lt: 130 } }
  ]
});

// Usuarios que tengan suscripción Estándar O tengan menos de 4 vistos
db.usuarios.find({
  $or: [
    { suscripcion: "Estándar" },
    { historial_vistos: { $lt: 4 } }
  ]
});

// Actualizar 

// Actualizar la calificación y comentario de una valoración
db.valoraciones.updateOne(
  { usuario_id: ObjectId("60c72b2f9b1d8b2bad111113"), contenido_id: ObjectId("60c72b2f9b1d8b2bad222221") },
  { $set: { calificacion: 5, comentario: "Cambio mi opinión, es un 5/5 impecable." } }
);

// Agregar un nuevo género favorito a todos los usuarios Premium 
db.usuarios.updateMany(
  { suscripcion: "Premium" },
  { $addToSet: { generos_favoritos: "Terror" } }
);

// Eliminar 
db.contenidos.deleteOne({ titulo: "The Office" });

// Índice en el campo 'titulo'
db.contenidos.createIndex({ titulo: 1 });

// Índice compuesto de valoraciones 
db.valoraciones.createIndex({ contenido_id: 1, calificacion: -1 });

// Listar los índices creados 
db.contenidos.getIndexes();
db.valoraciones.getIndexes();

/* Pipelines */

// // Calcular la calificación promedio de contenidos con calificaciones altas (>= 4)

db.valoraciones.aggregate([
  {
    $match: { calificacion: { $gte: 4 } } // Filtrado requerido por la guía
  },
  {
    $group: {
      _id: "$contenido_id",
      calificacion_promedio: { $avg: "$calificacion" },
      total_votos: { $sum: 1 }
    }
  },
  {
    $lookup: {
      from: "contenidos",
      localField: "_id",
      foreignField: "_id",
      as: "detalle_contenido"
    }
  },
  { $unwind: "$detalle_contenido" },
  {
    $project: {
      _id: 0,
      titulo: "$detalle_contenido.titulo",
      calificacion_promedio: 1,
      total_votos: 1
    }
  },
  { $sort: { calificacion_promedio: -1 } }
]);

// // Contar cuántos contenidos existen por cada género 

db.contenidos.aggregate([
  {
    $match: { tipo: "Película" } // Filtrado inicial requerido por la guía
  },
  { $unwind: "$generos" },
  {
    $group: {
      _id: "$generos",
      total_titulos: { $sum: 1 }
    }
  },
  { $sort: { total_titulos: -1 } },
  {
    $project: {
      _id: 0,
      genero: "$_id",
      total_titulos: 1
    }
  }
]);