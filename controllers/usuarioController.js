import {check, validationResult} from "express-validator";
import Usuario from "../models/Usuario.js";
import {generarId} from "../helpers/tokens.js";
import {emailRegistro} from "../helpers/emails.js";

const formularioLogin = (req,res) => {
    res.render('auth/login',{
        pagina : 'Iniciar Sesión'
    })
}

const formularioRegistro = (req,res) => {
    res.render('auth/registro',{
        pagina : 'Crear Cuenta',
    })
}

const registrar = async (req,res) =>{
    //Validacion
    await check('nombre').notEmpty().withMessage('El nombre es obligatorio').run(req);
    await check('email').isEmail().withMessage('Email invalido').run(req);
    await check('password').isLength({min : 6}).withMessage('La contraseña debe ser de al menos 6 caracteres').run(req);
    await check('repetir_password').equals(req.body.password).withMessage('Las contraseñas no coinciden').run(req);

    let resultado = validationResult(req)

    //Verificar que el resultado este vacio
    if(!resultado.isEmpty()){
        //Errores
        return res.render('auth/registro',{
            pagina : 'Crear cuenta',
            errores : resultado.array(),
            usuario : {
                nombre :  req.body.nombre,
                email :  req.body.email,
            }
        })
    }

    const {nombre,email,password} = req.body

    //Verificar que el usuario no este duplicado
    const existeUsuario = await Usuario.findOne({where : {email}})

   if(existeUsuario){
       return res.render('auth/registro',{
           pagina : 'Crear cuenta',
           errores : [{msg : 'El email ya esta en uso'}],
           usuario : {
               nombre,
               email
           }
       })
   }

   //Almacenar un usuario
    const usuario = await Usuario.create({
        nombre,
        email,
        password,
        token : generarId()
    })

    //Envia email de confirmacion
    emailRegistro({
        nombre : usuario.nombre,
        email : usuario.email,
        token : usuario.token
    })

    //Mostrar mensaje de confirmacion
    res.render('templates/mensaje', {
        pagina : 'Cuenta Creada Correctamente',
        mensaje : 'Hemos Enviado un Email de Confirmación, presiona en el enlace'
    })

}

const formularioOlvidePassword = (req,res) => {
    res.render('auth/olvide-password',{
        pagina : 'Recuperar Cuenta'
    })
}

export {
    formularioLogin,
    formularioRegistro,
    registrar,
    formularioOlvidePassword
}