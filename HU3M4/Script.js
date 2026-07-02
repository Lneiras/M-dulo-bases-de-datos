
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
db.usuarios.insertOne([{ _id: ObjectId("60c72b2f9b1d8b2bad111111"), 
nombre: "Laura Solano", email: "laura@email.com",
historial_vistos: 5, 
suscripcion: "Premium", 
generos_favoritos: ["Sci-Fi", "Drama", "Acción"] }]);


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

// READ

// Películas con duración > 120 min
db.contenidos.find({
  tipo: "Película",
  duracion_min: { $gt: 120 } 
});

// Usuarios que vieron > 5 contenidos 
db.usuarios.find({
     historial_vistos: { $gt: 5 } 
});

// Contenidos que pertenezcan a los géneros 'Sci-Fi' o 'Comedia' ($in)
db.contenidos.find({
  generos: { $in: ["Sci-Fi", "Comedia"] }
});

// Búsqueda por patrón de texto (Regex): Títulos que contengan la palabra "Office" sin importar mayúsculas
db.contenidos.find({
  titulo: { $regex: "office", $options: "i" }
});
