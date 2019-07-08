const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/adicionar-colaboradores', (req, res) => {
    res.render('colaboradores/adicionar-colaboradores');
});

router.post('/adicionar-colaboradores', async (req, res) => {
    const { recusaram, problemas, bons, neutros } = req.body;
    const flag = 'adicionado';
    const newLink = {
          recusaram,
          problemas,
          bons,
          neutros,
          flag,
          user_id: req.user.id,
          fullname: req.user.fullname
    };
    await pool.query('INSERT INTO colaboradores SET ?', [newLink]);
    const data = await pool.query('SELECT DATE_FORMAT(criado_em, "%D %M %Y") as data FROM colaboradores ORDER BY id DESC LIMIT 1');
    await pool.query('UPDATE colaboradores SET data_registro = ? ORDER BY id DESC LIMIT 1', data[0].data);
    req.flash('success', 'Incluído com sucesso');
    res.redirect('/colaboradores');
});

router.get('/', isLoggedIn, async (req, res) => {
    const colaboradores = await pool.query('SELECT * FROM colaboradores WHERE flag = "adicionado" OR flag = "editado"');
    const registro = await pool.query('SELECT * FROM colaboradores WHERE criado_em >= last_day(now()) + interval 1 day - interval 1 month');
    await pool.query('DELETE FROM colaboradores WHERE flag = "deletado" AND criado_em < DATE_SUB(CURDATE(), interval 1 month)');
    res.render('colaboradores/colaboradores', { colaboradores, registro });
});

router.get('/editar-colaboradores/:id', async (req, res) => {
    const { id } = req.params;
    const colaboradores = await pool.query('SELECT * FROM colaboradores WHERE id = ?', [id]);
    res.render('colaboradores/editar-colaboradores', {colaborador: colaboradores[0]});
});

router.post('/editar-colaboradores/:id', async (req, res) => {
    const { id } = req.params;
    const { recusaram, problemas, bons, neutros } = req.body;
    const flag = 'editado';
    const newLink = {
          recusaram,
          problemas,
          bons,
          neutros,
          flag,
          fullname: req.user.fullname
    };
    await pool.query('UPDATE colaboradores SET ? WHERE id = ?', [newLink, id]);
    const data = await pool.query('SELECT DATE_FORMAT(criado_em, "%D %M %Y") as data FROM colaboradores ORDER BY id DESC LIMIT 1');
    await pool.query('UPDATE colaboradores SET data_registro = ? WHERE id = ?', [data[0].data, id]);
    req.flash('success', 'Atualizado com sucesso');
    res.redirect('/colaboradores');
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    const flag = 'deletado';
    const newLink = {
          flag
    };
    await pool.query('UPDATE colaboradores SET ? WHERE id = ?', [newLink, id]);
    const data = await pool.query('SELECT DATE_FORMAT(criado_em, "%D %M %Y") as data FROM colaboradores ORDER BY id DESC LIMIT 1');
    await pool.query('UPDATE colaboradores SET data_registro = ? WHERE id = ?', [data[0].data, id]);
    req.flash('success', 'Removido com sucesso');
    res.redirect('/colaboradores');
});

module.exports = router;