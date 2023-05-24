const express = require ('express')

const router = express.Router ();
const {check} = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth')
const {validarCampos} = require('../middlewares/validar-campos');

router.post ('/', loginUsuario)

router.post(
    '/new',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmpty(),
        check('password', ).isLength({ min: 6}),
        validarCampos
    ],
    crearUsuario )
router.get('/renew', revalidarToken)
module.exports = router;