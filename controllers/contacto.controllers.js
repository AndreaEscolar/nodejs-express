function validateContacto({ nombre, apellidos, telefono, descripcion }) {
  const errors = {};

  // Letras (incluye tildes/ñ) + espacios. Si en clase solo queréis A-Z, cambia la regex.
  const regexLetras = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/;
  const regexTelefono = /^[0-9]{9}$/;

  // Normalizar (evita errores por espacios)
  nombre = (nombre ?? "").trim();
  apellidos = (apellidos ?? "").trim();
  telefono = (telefono ?? "").trim();
  descripcion = (descripcion ?? "").trim();

  if (!nombre) errors.nombre = "El nombre es obligatorio.";
  else if (!regexLetras.test(nombre)) errors.nombre = "El nombre solo puede contener letras.";

  if (!apellidos) errors.apellidos = "Los apellidos son obligatorios.";
  else if (!regexLetras.test(apellidos)) errors.apellidos = "Los apellidos solo pueden contener letras.";

  if (!telefono) errors.telefono = "El teléfono es obligatorio.";
  else if (!regexTelefono.test(telefono)) errors.telefono = "El teléfono debe tener 9 dígitos numéricos.";

  if (!descripcion) errors.descripcion = "La descripción es obligatoria.";
  else if (descripcion.length > 250) errors.descripcion = "La descripción no puede superar 250 caracteres.";

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    values: { nombre, apellidos, telefono, descripcion },
  };
}

function renderContacto(req, res) {
  res.render("contacto", { errors: {}, values: {} });
}

function submitContacto(req, res) {
  const { isValid, errors, values } = validateContacto(req.body);

  if (!isValid) {
    return res.status(400).render("contacto", { errors, values });
  }

  // Aquí “simularías” guardar/enviar email.
  // Para la práctica, con esto vale:
  return res.render("contacto_ok", { values });
}

module.exports = { renderContacto, submitContacto };
