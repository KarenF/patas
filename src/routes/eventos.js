const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/adicionar-evento', (req, res) => {
    res.render('eventos/adicionar-evento');
});

router.post('/adicionar-evento', async (req, res) => {
    const { dia, mes, ano, evento, responsavel, calendario, agenda, c_vendido, a_vendida, obs } = req.body;
    const flag = 'adicionado';
    const newLink = {
          dia,
          mes,
          ano,
          evento,
          responsavel,
          calendario,
          agenda,
          c_vendido,
          a_vendida,
          obs,
          flag,
          user_id: req.user.id,
          fullname: req.user.fullname
    };
    if(newLink.agenda === ''){
      newLink.agenda = 0;
    }
    if(newLink.calendario === ''){
      newLink.calendario = 0;
    }
    if(newLink.a_vendida === ''){
      newLink.a_vendida = 0;
    }
    if(newLink.c_vendido === ''){
      newLink.c_vendido = 0;
    }
    await pool.query('INSERT INTO eventos SET ?', [newLink]);
    const data = await pool.query('SELECT DATE_FORMAT(criado_em, "%D %M %Y") as data FROM eventos ORDER BY id DESC LIMIT 1');
    await pool.query('UPDATE eventos SET data_registro = ? WHERE id = LAST_INSERT_ID()', data[0].data);
    const aqui = await pool.query('SELECT id FROM eventos ORDER BY id DESC LIMIT 1');
    const preco = await pool.query('SELECT * FROM preco');
    if(typeof preco === undefined || preco.length === 0){
        const total = 0;
        await pool.query('UPDATE eventos SET total = ?', total);
    }else{
        const total = (preco[0].p_agenda * a_vendida) + (preco[0].p_calendario * c_vendido);
        await pool.query('UPDATE eventos SET total = ? WHERE id = ?', [total, aqui[0].id]);
    }
    req.flash('success', 'Incluído com sucesso');
    res.redirect('/eventos');
});

router.get('/', isLoggedIn, async (req, res) => {
    const eventos = await pool.query('SELECT * FROM eventos WHERE flag = "adicionado" OR flag = "editado"');
    const registro = await pool.query('SELECT * FROM eventos WHERE criado_em >= last_day(now()) + interval 1 day - interval 1 month');
    const somas = await pool.query('SELECT SUM(a_vendida) soma_a, SUM(c_vendido) soma_c, SUM(total) soma_t FROM eventos WHERE flag = "adicionado" OR flag = "editado"');
    const s_a_vendida = somas[0].soma_a;
    const s_c_vendido = somas[0].soma_c;
    const s_total = somas[0].soma_t;
    const newLink = {
          s_a_vendida,
          s_c_vendido,
          s_total
    };
    const verifica_soma = await pool.query('SELECT * FROM soma_eventos');
    if(verifica_soma.length === 0){
      await pool.query('INSERT INTO soma_eventos SET ?', [newLink]);      
    }else{
      await pool.query('UPDATE soma_eventos SET s_a_vendida = ?, s_c_vendido = ?, s_total = ?', [somas[0].soma_a, somas[0].soma_c, somas[0].soma_t]);  
    }
    if(eventos.length === 0){
      await pool.query('DELETE FROM soma_eventos');
    }
    const soma_eventos = await pool.query('SELECT * FROM soma_eventos');
    await pool.query('DELETE FROM eventos WHERE flag = "deletado" AND criado_em < DATE_SUB(CURDATE(), interval 1 month)');
    res.render('eventos/eventos', { eventos, registro, soma_eventos });
});

router.get('/editar-evento/:id', async (req, res) => {
    const { id } = req.params;
    const eventos = await pool.query('SELECT * FROM eventos WHERE id = ?', [id]);
    res.render('eventos/editar-evento', {evento: eventos[0]});
});

router.post('/editar-evento/:id', async (req, res) => {
    const { id } = req.params;
    const { dia, mes, ano, evento, responsavel, calendario, agenda, c_vendido, a_vendida, obs } = req.body;
    const flag = 'editado';
    const newLink = {
          dia,
          mes,
          ano,
          evento,
          responsavel,
          agenda,
          calendario,
          c_vendido,
          a_vendida,
          obs,
          flag,
          fullname: req.user.fullname
    };
    if(newLink.agenda === ''){
      newLink.agenda = 0;
    }
    if(newLink.calendario === ''){
      newLink.calendario = 0;
    }
    if(newLink.a_vendida === ''){
      newLink.a_vendida = 0;
    }
    if(newLink.c_vendido === ''){
      newLink.c_vendido = 0;
    }
    if(newLink.pago === ''){
      newLink.pago = 0;
    }
    await pool.query('UPDATE eventos SET ? WHERE id = ?', [newLink, id]);
    const preco = await pool.query('SELECT * FROM preco');
    if(typeof preco === undefined || preco.length === 0){
        const totais = 0;
        await pool.query('UPDATE eventos SET total = ?', totais);
    }else{
        const total = (preco[0].p_agenda * a_vendida) + (preco[0].p_calendario * c_vendido);
        await pool.query('UPDATE eventos SET total = ? WHERE id = ?', [total, id]);
    }
    const data = await pool.query('SELECT DATE_FORMAT(criado_em, "%D %M %Y") as data FROM eventos ORDER BY id DESC LIMIT 1');
    await pool.query('UPDATE eventos SET data_registro = ? WHERE id = ?', [data[0].data, id]);
    req.flash('success', 'Atualizado com sucesso');
    res.redirect('/eventos');
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    const flag = 'deletado';
    const newLink = {
          flag
    };
    await pool.query('UPDATE eventos SET ? WHERE id = ?', [newLink, id]);
    const data = await pool.query('SELECT DATE_FORMAT(criado_em, "%D %M %Y") as data FROM eventos ORDER BY id DESC LIMIT 1');
    await pool.query('UPDATE eventos SET data_registro = ? WHERE id = ?', [data[0].data, id]);
    req.flash('success', 'Removido com sucesso');
    res.redirect('/eventos');
});

module.exports = router;