const express = require('express');
const router = express.Router();

const passport = require('passport');
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/cadastrar', isLoggedIn, (req, res) => {
  res.render('auth/cadastrar');
});

router.post('/cadastrar', passport.authenticate('local.cadastrar', {
  successRedirect: '/perfil',
  failureRedirect: '/cadastrar',
  failureFlash: true
}));

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.post('/login', (req, res, next) => {
  req.check('username', 'Usuário não informado').notEmpty();
  req.check('password', 'Senha não informada').notEmpty();
  const errors = req.validationErrors();
  if (errors.length > 0) {
    req.flash('message', errors[0].msg);
    res.redirect('/login');
  }
  passport.authenticate('local.login', {
    successRedirect: '/perfil',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

router.get('/redefinir-senha', (req, res) => {
  res.render('auth/redefinir-senha');
});

router.post('/redefinir-senha', (req, res, next) => {
  req.check('username', 'Usuário não informado').notEmpty();
  req.check('password', 'Senha não informada').notEmpty();
  const errors = req.validationErrors();
  if (errors.length > 0) {
    req.flash('message', errors[0].msg);
    res.redirect('/redefinir-senha');
  }
  passport.authenticate('local.redefinir-senha', {
    successRedirect: '/login',
    failureRedirect: '/redefinir-senha',
    failureFlash: true
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
});

router.get('/perfil', isLoggedIn, async (req, res) => {
  const dados = await pool.query('SELECT * FROM users');
  const fullname = dados[0].fullname;
  const username = dados[0].username;
  const newLink = {
        fullname,
        username,
        fullname: req.user.fullname
  };
  const voluntarios = await pool.query('SELECT * FROM users');
  res.render('perfil', { voluntarios });
});

router.get('/colaboradores/colaboradores', isLoggedIn, (req, res) => {
  res.render('colaboradores/colaboradores');
});

router.get('/coleta/coleta', isLoggedIn, (req, res) => {
  res.render('coleta/coleta');
});

router.get('/estoque/estoque', isLoggedIn, (req, res) => {
  res.render('estoque/estoque');
});

router.get('/eventos/eventos', isLoggedIn, (req, res) => {
  res.render('eventos/eventos');
});

router.get('/pontos/pontos', isLoggedIn, (req, res) => {
  res.render('pontos/pontos');
});

module.exports = router;
