import express from 'express';
import usuarioRoutes from "./routes/usuarioRoutes.js";
import db from "./config/db.js";

const app = express();

//Habilitar lectura de formularios
app.use(express.urlencoded({extended : true}));

//Conexion a la base de datos
try {
    await db.authenticate();
    db.sync();
    console.log('Base de datos conectada')
}catch (e) {
    console.log(e)
}

//Definir un puerto y arrancar el proyecto
const port = 3000;

//Habilitar template engine: PUG
app.set('view engine','pug');
app.set('views', './views');

//Carpeta publica
app.use(express.static('public'))

//Routing
app.use('/auth', usuarioRoutes);


app.listen(port, ()=>{
    console.log(`El servidor esta conectado en el puerto ${port}`);
})