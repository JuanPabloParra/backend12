const express = require('express');
const router = express.Router();
const { validarJWT } = require('../middlewares/validar-jwt');
const { listarTasks, crearTask, actualizarTask, eliminarTask } = require('../Controllers/Task.js');

router.use(validarJWT);
router.get('/', listarTasks);
router.post('/', crearTask);
router.put('/:id', actualizarTask); // Asegúrate de tener una función de controlador válida para actualizarTask
router.delete('/:id', eliminarTask);

module.exports = router;
