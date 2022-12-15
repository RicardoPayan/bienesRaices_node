import express from 'express';
import usuarioRoutes from "./routes/usuarioRoutes.js";

const app = express();

//Definir un puerto y arrancar el proyecto
const port = 3000;

//Routing
app.use('/', usuarioRoutes);

app.listen(port, ()=>{
    console.log(`El servidor esta conectado en el puerto ${port}`);
})