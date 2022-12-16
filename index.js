import express from 'express';
import usuarioRoutes from "./routes/usuarioRoutes.js";

const app = express();

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