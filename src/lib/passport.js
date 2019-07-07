const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('./helpers');

passport.use('local.login', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
  if (rows.length > 0) {
    const user = rows[0];
    const validPassword = await helpers.matchPassword(password, user.password)
    if (validPassword) {
      done(null, user, req.flash('success', 'Olá ' + user.username));
    } else {
      done(null, false, req.flash('message', 'Senha incorreta'));
    }
  } else {
    return done(null, false, req.flash('message', 'O usuário não existe'));
  }
}));

passport.use('local.cadastrar', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {

  const { fullname } = req.body;
  let newUser = {
    fullname,
    username,
    password
  };
  newUser.password = await helpers.encryptPassword(password);
  await pool.query('INSERT INTO users SET ? ', newUser);
  const data = await pool.query('SELECT DATE_FORMAT(criado_em, "%D %M %Y") as data FROM users ORDER BY id DESC LIMIT 1');
  await pool.query('UPDATE users SET data_registro = ? ORDER BY id DESC LIMIT 1', data[0].data);
  const result = await pool.query('SELECT * FROM users');
  newUser.id = result.insertId;
  return done(null, false, req.flash('success', 'Usuário ' + newUser.username + ' cadastrado com sucesso'));
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  done(null, rows[0]);
});