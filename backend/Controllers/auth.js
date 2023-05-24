const express = require ('express');
const { validationResult } = require ('express-validator');
const Usuario = require('../models/Usuario');


const crearUsuario = async (req, res = express.request ) => {
    const{ name, email, password} = req.body
    try{
        const usuario = new Usuario ( req.body);
        await usuario.save ();
        res.statusCode(200).json({
            ok: true,
            name, email, password
        })
    } catch (error){
        console.log ( error )
        res.statusCode(500).json ({
            ok: false,
            error,
        })
    }
}

const loginUsuario =(req, res = express.request ) => {
    res.json({
        ok: true
    })
}

const revalidarToken = (req, res = express.request) => {
    res.json({
        ok: true
    })
}

module.exports = {
    loginUsuario,
    crearUsuario,
    revalidarToken
}