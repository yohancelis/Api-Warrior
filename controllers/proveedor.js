const { response } = require("express");

const Proveedor = require("../models/proveedor");

const proveedorGet = async (req, res = response) => {
  const proveedores = await Proveedor.find();
  res.json({
    proveedores,
  });
};

const proveedorPost = async (req, res) => {
  const body = req.body;
  let mensaje = "Proveedor creado.";

  const proveedorExistenteCorreo = await Proveedor.findOne({ correo: body.correo });
  const proveedorExistenteNombreProveedor = await Proveedor.findOne({ nombreProveedor: body.nombreProveedor });
  const proveedorExistenteCelular = await Proveedor.findOne({ celular: body.celular });

  if (proveedorExistenteNombreProveedor) {
    mensaje = "El nombre de proveedor ya está en uso.";
  } else if (proveedorExistenteCorreo) {
    mensaje = "El correo ya está en uso por otro proveedor.";
  } else if (proveedorExistenteCelular) {
    mensaje = "El número de celular ya está en uso por otro proveedor.";
  } else {
    try {
      const proveedor = new Proveedor(body);
      await proveedor.save();
    } catch (error) {
      mensaje = "Problemas al crear el proveedor.";
      console.log(error);
    }
  }
  res.json({
    msg: mensaje,
  });
};

const proveedorPut = async (req, res) => {
  const { nombreProveedor, nombreContacto, correo, celular } = req.body;
  let mensaje = "Proveedor actualizado correctamente.";

  const proveedorExiste = await Proveedor.findOne({ nombreProveedor: nombreProveedor });

  if (!proveedorExiste) {
    mensaje = "Proveedor no encontrado";
  } else {
    try {
      if (correo !== proveedorExiste.correo) {
        const otroProveedorConCorreo = await Proveedor.findOne({ correo: correo });
        if (otroProveedorConCorreo) {
          mensaje = "Ese correo ya está asignado a otro proveedor";
        } else {
          proveedorExiste.correo = correo;
        }
      }
      if (celular !== proveedorExiste.celular) {
        const otroProveedorConCelular = await Proveedor.findOne({ celular: celular });
        if (otroProveedorConCelular) {
          mensaje = "Ese número de celular ya está asignado a otro proveedor.";
        } else {
          proveedorExiste.celular = celular;
        }
      }

      proveedorExiste.nombreContacto = nombreContacto;

      await proveedorExiste.save();
    } catch (error) {
      mensaje = "Problemas al modificar";
      console.log(error);
    }
  }
  res.json({
    msg: mensaje,
  });
};

const proveedorDelete = async (req, res = response) => {
  const { _id } = req.body;
  let mensaje = "Eliminación exitosa";
  try {
    await Proveedor.deleteOne({ _id: _id });
  } catch (error) {
    mensaje = "Problemas al eliminar";
    console.log(error);
  }
  res.json({
    msg: mensaje,
  });
};

module.exports = { proveedorGet, proveedorPost, proveedorPut, proveedorDelete };
