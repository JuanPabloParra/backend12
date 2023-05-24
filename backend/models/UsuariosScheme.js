const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

UsuarioSchema.virtual("tareas", {
  ref: "Task",
  localField: "_id",
  foreignField: "user",
  justOne: false,
});

module.exports = model("Usuario", UsuarioSchema);
