const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/adicionar-coleta', (req, res) => {
    res.render('coleta/adicionar-coleta');
});

router.post('/adicionar-coleta', async (req, res) => {
    const { nome_local, dia_coleta, mes_coleta, ano_coleta, item, quantidade } = req.body;
    const flag = 'adicionado'; 
    const newLink = {
          nome_local,
          dia_coleta,
          mes_coleta,
          ano_coleta,
          item,
          quantidade,
          flag,
          user_id: req.user.id,
          fullname: req.user.fullname
    };
    await pool.query('INSERT INTO coleta SET ?', [newLink]);
    const data = await pool.query('SELECT DATE_FORMAT(criado_em, "%D %M %Y") as data FROM coleta ORDER BY id DESC LIMIT 1');
    await pool.query('UPDATE coleta SET data_registro = ? ORDER BY id DESC LIMIT 1', data[0].data);
    req.flash('success', 'Incluído com sucesso');
    res.redirect('/coleta');
});

router.get('/', isLoggedIn, async (req, res) => {
    const coleta = await pool.query('SELECT * FROM coleta WHERE flag = "adicionado" OR flag = "editado"');
    const registro = await pool.query('SELECT * FROM coleta WHERE criado_em >= last_day(now()) + interval 1 day - interval 1 month');
    await pool.query('DELETE FROM coleta WHERE flag = "deletado" AND criado_em < DATE_SUB(CURDATE(), interval 1 month)');
    res.render('coleta/coleta', { coleta, registro });
});

router.get('/editar-coleta/:id', async (req, res) => {
    const { id } = req.params;
    const coleta = await pool.query('SELECT * FROM coleta WHERE id = ?', [id]);
    res.render('coleta/editar-coleta', {coletas: coleta[0]});
});

router.post('/editar-coleta/:id', async (req, res) => {
    const { id } = req.params;
    const { nome_local, dia_coleta, mes_coleta, ano_coleta, item, quantidade } = req.body;
    const flag = 'editado';
    const newLink = {
          nome_local,
          dia_coleta,
          mes_coleta,
          ano_coleta,
          item,
          quantidade,
          flag,
          fullname: req.user.fullname
    };
    await pool.query('UPDATE coleta SET ? WHERE id = ?', [newLink, id]);
    const data = await pool.query('SELECT DATE_FORMAT(criado_em, "%D %M %Y") as data FROM coleta ORDER BY id DESC LIMIT 1');
    await pool.query('UPDATE coleta SET data_registro = ? WHERE id = ?', [data[0].data, id]);
    req.flash('success', 'Atualizado com sucesso');
    res.redirect('/coleta');
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    const flag = 'deletado';
    const newLink = {
          flag
    };
    await pool.query('UPDATE coleta SET ? WHERE id = ?', [newLink, id]);
    const data = await pool.query('SELECT DATE_FORMAT(criado_em, "%D %M %Y") as data FROM coleta ORDER BY id DESC LIMIT 1');
    await pool.query('UPDATE coleta SET data_registro = ? WHERE id = ?', [data[0].data, id]);
    req.flash('success', 'Removido com sucesso');
    res.redirect('/coleta');
});

module.exports = router;