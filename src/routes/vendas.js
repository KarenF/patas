const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/adicionar-vendas', (req, res) => {
    res.render('vendas/adicionar-vendas');
});

router.post('/adicionar-vendas', async (req, res) => {
    const { local, endereco, contato, leva, v_responsavel, agendas, calendarios, pago, observacao } = req.body;
    const flag = 'adicionado';
    const newLink = {
          local,
          endereco,
          contato,
          leva,
          v_responsavel,
          agendas,
          calendarios,
          pago,
          observacao,
          flag,
          user_id: req.user.id,
          fullname: req.user.fullname
    };
    if(newLink.agendas === ''){
      newLink.agendas = 0;
    }
    if(newLink.calendarios === ''){
      newLink.calendarios = 0;
    }
    if(newLink.pago === ''){
      newLink.pago = 0;
    }
    await pool.query('INSERT INTO vendas SET ?', [newLink]);
    const data = await pool.query('SELECT DATE_FORMAT(criado_em, "%D %M %Y") as data FROM vendas ORDER BY id DESC LIMIT 1');
    await pool.query('UPDATE vendas SET data_registro = ? WHERE id = LAST_INSERT_ID()', data[0].data);
    const aqui = await pool.query('SELECT id FROM vendas ORDER BY id DESC LIMIT 1');
    const preco = await pool.query('SELECT * FROM preco');
    if(typeof preco === undefined || preco.length === 0){
        const totais = 0;
        await pool.query('UPDATE vendas SET totais = ?', totais);
    }else{
        const totais = (preco[0].p_agenda * agendas) + (preco[0].p_calendario * calendarios);
        await pool.query('UPDATE vendas SET totais = ? WHERE id = ?', [totais, aqui[0].id]);
    }
    const pagamento = await pool.query('SELECT totais, pago FROM vendas WHERE id = ?', [aqui[0].id]);
    const pagar = pagamento[0].totais - pagamento[0].pago;
    await pool.query('UPDATE vendas SET pagar = ? WHERE id = ?', [pagar, aqui[0].id]);
    req.flash('success', 'Incluído com sucesso');
    res.redirect('/venda');
});

router.get('/adicionar-preco', (req, res) => {
    res.render('vendas/adicionar-preco');
});

router.post('/adicionar-preco', async (req, res) => {
    const { p_agenda, p_calendario } = req.body; 
    const newLink = {
          p_agenda,
          p_calendario
    };
    if(newLink.p_agenda === ''){
      newLink.p_agenda = 0;
    }
    if(newLink.p_calendario === ''){
      newLink.p_calendario = 0;
    }
    await pool.query('INSERT INTO preco SET ?', [newLink]);        
    const preco = await pool.query('SELECT * FROM preco');
    const aqui = await pool.query('SELECT id FROM vendas');
    const aqui_eventos = await pool.query('SELECT id FROM eventos');
    const produtos = await pool.query('SELECT agendas, calendarios FROM vendas');
    const vendidos = await pool.query('SELECT a_vendida, c_vendido FROM eventos');
    for(var i=0; i<produtos.length; i++){
      const totais = (preco[0].p_agenda * produtos[i].agendas) + (preco[0].p_calendario * produtos[i].calendarios);
      await pool.query('UPDATE vendas SET totais = ? WHERE id = ?', [totais, aqui[i].id]);
      const pagamento = await pool.query('SELECT totais, pago FROM vendas WHERE id = ?', [aqui[0].id]);
      const pagar = pagamento[0].totais - pagamento[0].pago;
      await pool.query('UPDATE vendas SET pagar = ? WHERE id = ?', [pagar, aqui[0].id]);
    }
    for(var i=0; i<vendidos.length; i++){
      const total = (preco[0].p_agenda * vendidos[i].a_vendida) + (preco[0].p_calendario * vendidos[i].c_vendido);
      await pool.query('UPDATE eventos SET total = ? WHERE id = ?', [total, aqui_eventos[i].id]);
    }
    req.flash('success', 'Incluído com sucesso');
    res.redirect('/venda');
});

router.get('/', isLoggedIn, async (req, res) => {
    const vendas = await pool.query('SELECT * FROM vendas WHERE flag = "adicionado" OR flag = "editado"');
    const registro = await pool.query('SELECT * FROM vendas WHERE criado_em >= last_day(now()) + interval 1 day - interval 1 month');
    const preco = await pool.query('SELECT * FROM preco');
    const somas = await pool.query('SELECT SUM(agendas) soma_a, SUM(calendarios) soma_c, SUM(totais) soma_t, SUM(pago) soma_pago, SUM(pagar) soma_pagar FROM vendas WHERE flag = "adicionado" OR flag = "editado"');
    const s_agendas = somas[0].soma_a;
    const s_calendarios = somas[0].soma_c;
    const s_totais = somas[0].soma_t;
    const s_pago = somas[0].soma_pago;
    const s_pagar = somas[0].soma_pagar;
    const newLink = {
          s_agendas,
          s_calendarios,
          s_totais,
          s_pago,
          s_pagar
    };
    const verifica_soma = await pool.query('SELECT * FROM soma_vendas');
    if(verifica_soma.length === 0){
      await pool.query('INSERT INTO soma_vendas SET ?', [newLink]);
    }else{
      await pool.query('UPDATE soma_vendas SET s_agendas = ?, s_calendarios = ?, s_totais = ?, s_pago = ?, s_pagar = ?', [somas[0].soma_a, somas[0].soma_c, somas[0].soma_t, somas[0].soma_pago, somas[0].soma_pagar]);
    }
    if(vendas.length === 0){
      await pool.query('DELETE FROM soma_vendas');
    }
    const soma_vendas = await pool.query('SELECT * FROM soma_vendas');
    await pool.query('DELETE FROM vendas WHERE flag = "deletado" AND criado_em < DATE_SUB(CURDATE(), interval 1 month)');
    res.render('vendas/vendas', { vendas, preco, registro, soma_vendas });
});

router.get('/editar-vendas/:id', async (req, res) => {
    const { id } = req.params;
    const pontos = await pool.query('SELECT * FROM vendas WHERE id = ?', [id]);
    res.render('vendas/editar-vendas', {venda: pontos[0]});
});

router.post('/editar-vendas/:id', async (req, res) => {
    const { id } = req.params;
    const { local, endereco, contato, leva, v_responsavel, agendas, calendarios, pago, observacao } = req.body;
    const flag = 'editado';
    const newLink = {
          local,
    		  endereco,
    		  contato,
    		  leva,
    		  v_responsavel,
    		  agendas,
    		  calendarios,
    		  pago,
    		  observacao,
          flag,
          fullname: req.user.fullname
    };
    if(newLink.agendas === ''){
      newLink.agendas = 0;
    }
    if(newLink.calendarios === ''){
      newLink.calendarios = 0;
    }
    if(newLink.pago === ''){
      newLink.pago = 0;
    }
    await pool.query('UPDATE vendas SET ? WHERE id = ?', [newLink, id]);
    const preco = await pool.query('SELECT * FROM preco');
    if(typeof preco === undefined || preco.length === 0){
      const totais = 0;
      await pool.query('UPDATE vendas SET totais = ?', totais);
    }else{
      const totais = (preco[0].p_agenda * agendas) + (preco[0].p_calendario * calendarios);
      await pool.query('UPDATE vendas SET totais = ? WHERE id = ?', [totais, id]);
    }
    const pagamento = await pool.query('SELECT totais, pago FROM vendas WHERE id = ?', id);
    const pagar = pagamento[0].totais - pagamento[0].pago;
    const data = await pool.query('SELECT DATE_FORMAT(criado_em, "%D %M %Y") as data FROM vendas ORDER BY id DESC LIMIT 1');
    await pool.query('UPDATE vendas SET data_registro = ?, pagar = ? WHERE id = ?', [data[0].data, pagar, id]);
    req.flash('success', 'Atualizado com sucesso');
    res.redirect('/venda');
});

router.get('/editar-preco/:id', async (req, res) => {
    const { id } = req.params;
    const preco = await pool.query('SELECT * FROM preco WHERE id = ?', [id]);
    res.render('vendas/editar-preco', {precos: preco[0]});
});

router.post('/editar-preco/:id', async (req, res) => {
    const { id } = req.params;
    const { p_agenda, p_calendario } = req.body; 
    const newLink = {
          p_agenda,
          p_calendario
    };
    if(newLink.p_agenda === ''){
      newLink.p_agenda = 0;
    }
    if(newLink.p_calendario === ''){
      newLink.p_calendario = 0;
    }
    await pool.query('UPDATE preco SET ? WHERE id = ?', [newLink, id]);      
    const preco = await pool.query('SELECT * FROM preco');
    const aqui = await pool.query('SELECT id FROM vendas');
    const aqui_eventos = await pool.query('SELECT id FROM eventos');
    const produtos = await pool.query('SELECT agendas, calendarios FROM vendas');
    const vendidos = await pool.query('SELECT a_vendida, c_vendido FROM eventos');
    for(var i=0; i<produtos.length; i++){
      const totais = (preco[0].p_agenda * produtos[i].agendas) + (preco[0].p_calendario * produtos[i].calendarios);
      await pool.query('UPDATE vendas SET totais = ? WHERE id = ?', [totais, aqui[i].id]);
    }
    for(var i=0; i<vendidos.length; i++){
      const total = (preco[0].p_agenda * vendidos[i].a_vendida) + (preco[0].p_calendario * vendidos[i].c_vendido);
      await pool.query('UPDATE eventos SET total = ? WHERE id = ?', [total, aqui_eventos[i].id]);
    }
    const pagamento = await pool.query('SELECT totais, pago FROM vendas WHERE id = ?', [aqui[0].id]);
    const pagar = pagamento[0].totais - pagamento[0].pago;
    await pool.query('UPDATE vendas SET pagar = ? WHERE id = ?', [pagar, aqui[0].id]);
    req.flash('success', 'Atualizado com sucesso');
    res.redirect('/venda');
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    const flag = 'deletado';
    const newLink = {
          flag
    };
    await pool.query('UPDATE vendas SET ? WHERE id = ?', [newLink, id]);
    const data = await pool.query('SELECT DATE_FORMAT(criado_em, "%D %M %Y") as data FROM vendas ORDER BY id DESC LIMIT 1');
    await pool.query('UPDATE vendas SET data_registro = ? WHERE id = ?', [data[0].data, id]);
    req.flash('success', 'Removido com sucesso');
    res.redirect('/venda');
});

router.get('/preco/delete/:id', async (req, res) => {
    const { id } = req.params;
    const aqui = await pool.query('SELECT id FROM vendas');
    const aqui_eventos = await pool.query('SELECT id FROM eventos');
    const produtos = await pool.query('SELECT agendas, calendarios FROM vendas');
    const vendidos = await pool.query('SELECT a_vendida, c_vendido FROM eventos');
    for(var i=0; i<produtos.length; i++){
      const totais = 0;
      await pool.query('UPDATE vendas SET totais = ?', totais);
      await pool.query('UPDATE eventos SET total = ?', totais);
      const pagamento = await pool.query('SELECT totais, pago FROM vendas WHERE id = ?', [aqui[0].id]);
      const pagar = pagamento[0].totais - pagamento[0].pago;
      await pool.query('UPDATE vendas SET pagar = ? WHERE id = ?', [pagar, aqui[0].id]);
    }
    await pool.query('DELETE FROM preco WHERE ID = ?', [id]);
    req.flash('success', 'Removido com sucesso');
    res.redirect('/venda');
});

module.exports = router;