const socket = io();

socket.on("connect", () => {
  console.log("connected", socket.id);
});

const payload = {
  mensaje: "Hello world",
  uid: 123,
  fecha: "Oct 27, 2022",
};

socket.emit("mensaje-de-cliente", payload, (data) => {
  console.log("Respuesta a tu mensaje", data);
});

socket.on("mensaje-de-server", (payload) => {
  console.log(payload);
});

socket.on("disconnect", () => {
  console.log("Disconnect");
});

const txtUid = document.querySelector("#txtUid");
const txtMensaje = document.querySelector("#txtMensaje");
const listarUsuarios = document.querySelector("#lista-usuarios");
const chats = document.querySelector("#chats-body");
const private = document.querySelector("#private");

socket.on("usuarios-activos", (payload) => {
  let userHtml = "";
  payload.forEach((element) => {
    if (socket.id === element) return;
    userHtml += `<li> ${element} </li>`;
  });
  listarUsuarios.innerHTML = userHtml;
});

txtMensaje.addEventListener("keyup", ({ keyCode }) => {
  const uId = txtUid.value;
  const mensaje = txtMensaje.value;

  const payload = {
    from: socket.id,
    to: uId,
    mensaje,
  };

  if (keyCode != 13) {
    return;
  }
  if (mensaje.length == 0) {
    return;
  }

  socket.emit("enviar-mensaje", payload);
});

socket.on("recibir-mensaje", (payload) => {
  console.log(payload);
  const className =
    payload.from == socket.id ? "text-end" : "text-start text-primary";

  if (!payload.to) {
    chats.innerHTML += `<li class="${className}"> <small> ${payload.mensaje} </small> </li>`;
  } else {
    private.innerHTML += `<li class="${className}"> <small> ${payload.mensaje} </small> </li>`;
  }
});

// Nuevo código para el botón enviar
const btnEnviar = document.querySelector("#btnEnviar");

btnEnviar.addEventListener("click", () => {
  const uId = txtUid.value;
  const mensaje = txtMensaje.value;

  const payload = {
    from: socket.id,
    to: uId,
    mensaje,
  };

  if (mensaje.length === 0) {
    return;
  }

  socket.emit("enviar-mensaje", payload);
  txtMensaje.value = "";
});
