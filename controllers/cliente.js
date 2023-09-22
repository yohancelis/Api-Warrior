const { response } = require("express");

const Cliente = require("../models/cliente");
// const Usuario = require("../models/usuario"); para conectar con usurios y hacer consulta con usuarios para mas adelante

const clienteGet = async (req, res = response) => {
  const clientes = await Cliente.find();

  res.json({
    clientes,
  });
};

const clientePost = async (req, res) => {
  const body = req.body;
  let mensaje = "Cliente creado.";

  const clienteExistenteCorreo = await Cliente.findOne({ correo: body.correo });
  const clienteExistenteNombreUsuario = await Cliente.findOne({ nombreUsu: body.nombreUsu });
  const clienteExistenteCelular = await Cliente.findOne({ celular: body.celular });

  if (clienteExistenteNombreUsuario) {
    mensaje = "El nombre de usuario ya está en uso por otro usuario.";
  } else if (clienteExistenteCorreo) {
    mensaje = "El correo ya está en uso por otro usuario.";
  } else if (clienteExistenteCelular) {
    mensaje = "El número de celular ya está en uso por otro usuario.";
  } else {
    try {
      const cliente = new Cliente(body);
      await cliente.save();
    } catch (error) {
      mensaje = "Problemas al crear el cliente.";
    }
  }
  res.json({
    msg: mensaje,
  });
};

const clientePut = async (req, res) => {
  const { nombreUsu, nombre, apellidos, correo, password, celular } = req.body;
  let mensaje = "Modificación exitosa";

  const clienteExistente = await Cliente.findOne({ nombreUsu: nombreUsu });

  if (!clienteExistente) {
    mensaje = "Usuario no encontrado.";
  } else {
    try {
      if (correo !== clienteExistente.correo) {
        const otroclienteConCorreo = await Cliente.findOne({ correo: correo });
        if (otroclienteConCorreo) {
          mensaje = "Ese correo ya está asignado a otro usuario.";
        } else {
          clienteExistente.correo = correo;
        }
      }
      if (celular !== clienteExistente.celular) {
        const otroclienteConCelular = await Cliente.findOne({ celular: celular });
        if (otroclienteConCelular) {
          mensaje = "Ese número de celular ya está asignado a otro usuario.";
        } else {
          clienteExistente.celular = celular;
        }
      }

      clienteExistente.password = password !== undefined ? password : clienteExistente.password;

      await clienteExistente.save();
    } catch (error) {
      mensaje = "Problemas al modificar";
      console.log(error);
    }
  }

  res.json({
    msg: mensaje,
  });
};

const clienteDelete = async (req, res = response) => {
  const { _id } = req.body;
  let mensaje = "Eliminación exitosa";
  try {
    await Cliente.deleteOne({ _id: _id });
  } catch (error) {
    mensaje = "Problemas al eliminar";
    console.log(error);
  }
  res.json({
    msg: mensaje,
  });
};

module.exports = { clienteGet, clientePost, clientePut, clienteDelete };
