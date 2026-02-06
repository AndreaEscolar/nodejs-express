function validateContacto(body) {
  const errors = {};

  const nombre = (body.nombre ?? '').trim();
  const apellidos = (body.apellidos ?? '').trim();
  const telefono = (body.telefono ?? '').trim();
  const descripcion = (body.descripcion ?? '').trim();

  // Letras incluye tildes ñ y espacios
  const regexLetras = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/;
  // 9 dígitos
  const regexTelefono = /^[0-9]{9}$/;

  if (!nombre) {
    errors.nombre = 'El nombre es obligatorio.';
  } else if (!regexLetras.test(nombre)){
    errors.nombre = 'El nombre solo puede contener letras.';
  } 

  if (!apellidos) {
    errors.apellidos = 'Los apellidos son obligatorios.';
  } else if (!regexLetras.test(apellidos)) {
    errors.apellidos = 'Los apellidos solo pueden contener letras.';
  }
   

  if (!telefono) {
    errors.telefono = 'El teléfono es obligatorio.';
  } else if (!regexTelefono.test(telefono)) {
    errors.telefono = 'El teléfono debe tener exactamente 9 números.';
  }
   

  if (!descripcion) {
    errors.descripcion = 'La descripción es obligatoria.';
  } else if (descripcion.length > 250) {
     errors.descripcion = 'La descripción no puede superar 250 caracteres.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    values: { nombre, apellidos, telefono, descripcion },
  };
}

exports.home = (req, res) => {
  // Si está logueado, va a contacto si no, a login
  if (req.session.user){
    return res.redirect('/contacto')
  }
  return res.redirect('/login');
};

// ===== LOGIN =====
exports.login = (req, res) => {
  // Si ya está logueado, fuera del login
  if (req.session.user) {
    return res.redirect('/contacto');
  } 
  return res.render('login', { error: null });
};

exports.loginPost = (req, res) => {
  const email = (req.body.email ?? '').trim();
  const password = (req.body.password ?? '').trim();

  // Credenciales demo para clase
  const DEMO_EMAIL = 'admin@demo.com';
  const DEMO_PASS = '123456';

  if (email !== DEMO_EMAIL || password !== DEMO_PASS) {
    return res.status(401).render('login', { error: 'Credenciales incorrectas.' });
  }

  req.session.user = { email, role: 'admin' };
  console.log("SESSION AFTER:", req.session.user);
  return res.redirect('/contacto');
};

exports.logoutPost = (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
};

// ===== CONTACTO =====
exports.contactoGet = (req, res) => {
  return res.render('contacto', {
    errors: {},
    values: {},
    user: req.session.user,   
  });
};

exports.contactoPost = (req, res) => {
  const { isValid, errors, values } = validateContacto(req.body);

  if (!isValid) {
    return res.status(400).render('contacto', {
      errors,
      values,
      user: req.session.user, 
    });
  }

  return res.render('contacto-ok', {
    values,
    user: req.session.user,  
  });
};
