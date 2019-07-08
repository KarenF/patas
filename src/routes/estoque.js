const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/adicionar-estoque', (req, res) => {
    res.render('estoque/adicionar-estoque');
});

router.post('/adicionar-estoque', async (req, res) => {
    const { nome, item, q_recebida, q_devolvida, obs } = req.body;
    const flag = 'adicionado';
    const newLink = {
          nome,
          item,
          q_recebida,
          q_devolvida,
          flag,
          obs,
          user_id: req.user.id,
          fullname: req.user.fullname
    };
    if(newLink.q_devolvida === ''){
      newLink.q_devolvida = 0;
    }
    await pool.query('INSERT INTO estoque SET ?', [newLink]);
    const data = await pool.query('SELECT DATE_FORMAT(criado_em, "%D %M %Y") as data FROM coleta ORDER BY id DESC LIMIT 1');
    await pool.query('UPDATE estoque SET data_registro = ? ORDER BY id DESC LIMIT 1', data[0].data);
    req.flash('success', 'Incluído com sucesso');
    res.redirect('/estoque');
});

router.get('/', isLoggedIn, async (req, res) => {
    const estoque = await pool.query('SELECT * FROM estoque WHERE flag = "adicionado" OR flag = "editado"');
    const registro = await pool.query('SELECT * FROM estoque WHERE criado_em >= last_day(now()) + interval 1 day - interval 1 month');
    await pool.query('DELETE FROM estoque WHERE flag = "deletado" AND criado_em < DATE_SUB(CURDATE(), interval 1 month)');
    res.render('estoque/estoque', { estoque, registro });
});

router.get('/editar-estoque/:id', async (req, res) => {
    const { id } = req.params;
    const estoque = await pool.query('SELECT * FROM estoque WHERE id = ?', [id]);
    res.render('estoque/editar-estoque', {estoques: estoque[0]});
});

router.post('/editar-estoque/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, item, q_recebida, q_devolvida, obs } = req.body;
    const flag = 'editado';
    const newLink = {
          nome,
          item,
          q_recebida,
          q_devolvida,
          flag,
          obs,
          user_id: req.user.id,
          fullname: req.user.fullname
    };
    if(newLink.q_devolvida === ''){
      newLink.q_devolvida = 0;
    }
    await pool.query('UPDATE estoque SET ? WHERE id = ?', [newLink, id]);
    const data = await pool.query('SELECT DATE_FORMAT(criado_em, "%D %M %Y") as data FROM estoque ORDER BY id DESC LIMIT 1');
    await pool.query('UPDATE estoque SET data_registro = ? WHERE id = ?', [data[0].data, id]);
    req.flash('success', 'Atualizado com sucesso');
    res.redirect('/estoque');
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    const flag = 'deletado';
    const newLink = {
          flag
    };
    await pool.query('UPDATE estoque SET ? WHERE id = ?', [newLink, id]);
    const data = await pool.query('SELECT DATE_FORMAT(criado_em, "%D %M %Y") as data FROM estoque ORDER BY id DESC LIMIT 1');
    await pool.query('UPDATE estoque SET data_registro = ? WHERE id = ?', [data[0].data, id]);
    req.flash('success', 'Removido com sucesso');
    res.redirect('/estoque');
});

module.exports = router;