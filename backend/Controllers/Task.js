const crearTask = async (req, res = express.Response) => {
  const task = new Task(req.body);
  try {
    task.user = req.uid;
    const saved = await task.save();
    res.json({
      ok: true,
      task: saved
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      task: 'Internal Error'
    });
  }
};

const listarTasks = async (req, res = express.Response) => {
  try {
    const tasks = await Task.find().populate('user', 'name');
    res.status(200).json({
      ok: true,
      tasks
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      task: 'Error Interno'
    });
  }
};

const actualizarTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedData = req.body;

    // Buscar la tarea por su ID y actualizar los campos con los datos proporcionados
    const task = await Task.findByIdAndUpdate(taskId, updatedData, { new: true });

    if (!task) {
      return res.status(404).json({
        ok: false,
        error: 'Tarea no encontrada'
      });
    }

    res.json({
      ok: true,
      task
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      error: 'Error interno'
    });
  }
};

const eliminarTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    // Buscar la tarea por su ID y eliminarla
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({
        ok: false,
        error: 'Tarea no encontrada'
      });
    }

    res.json({
      ok: true,
      message: 'Tarea eliminada correctamente'
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      error: 'Error interno'
    });
  }
};

module.exports = {
  crearTask,
  listarTasks,
  actualizarTask,
  eliminarTask
};
