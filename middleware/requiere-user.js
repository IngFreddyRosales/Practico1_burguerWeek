exports.requireUser = (req, res, next) => {
    if (!req.session.usuario) {
        return res.redirect('/login');  // Redirige al login si no está autenticado
    }
    next();  // Si está autenticado, pasa al siguiente middleware o controlador
};