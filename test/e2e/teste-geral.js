module.exports = {
  'Step one: Acessar o site e fazer login' : function (client) {
    client
    .url('http://localhost:4000/login')
    .setValue('input[name="username"]', 'KF')
    .setValue('input[name="password"]', 'teste')
    .pause(2000)
    .click('#btnLogin')
    .pause(1000)
  },

  'Step two: Acessar o perfil' : function (client) {
     client
      .url('http://localhost:4000/perfil')
      .pause(1000)
  },

  'Step three: Clicar no navbar' : function (client){
    client
    .click('#navbarDropdown')
    .pause(1000)
  },

  'Step four: Clicar na tabela de colaboradores' : function(client){
    client
    .click('#navbarColaboradores')
    .pause(4000)
  },

  'Step five: Adicionar colaboradores' : function(client){
    client
    .click('#btnAddColab')
    .pause(1000)
  },

  'Step six: Salvar colaboradores adicionados' : function(client){
    client
    .pause(2000)
    .setValue('input[name="recusaram"]', 'Govinda')
    .setValue('input[name="problemas"]', 'Ve')
    .setValue('input[name="bons"]', 'PetShop')
    .setValue('input[name="neutros"]', 'Veterinária')
    .pause(2000)
    .click('#btnSalvaAddColab')
    .pause(4000)
  },

  'Step seven: Editar colaboradores' : function(client){
    client
    .click('#btnEditColab')
    .pause(2000)
    .clearValue('input[name="recusaram"]')
    .setValue('input[name="recusaram"]', '1')
    .clearValue('input[name="problemas"]')
    .setValue('input[name="problemas"]', '2')
    .clearValue('input[name="bons"]')
    .setValue('input[name="bons"]', '3')
    .clearValue('input[name="neutros"]')
    .setValue('input[name="neutros"]', '4')
    .pause(2000)
    .click('#btnSalvaEditColab')
    .pause(4000)
  },

  'Step eight: Deletar colaboradores' : function(client){
    client
    .click('#btnDeleteColab')
    .pause(4000)
  },

  'Step nine: Clicar no navbar' : function (client){
    client
    .click('#navbarDropdown')
    .pause(1000)
  },

  'Step ten: Clicar na tabela de coleta' : function(client){
    client
    .click('#navbarColeta')
    .pause(4000)
  },

  'Step eleven: Adicionar coleta' : function(client){
    client
    .click('#btnAddColeta')
    .pause(1000)
  },

  'Step twelve: Salvar coleta adicionada' : function(client){
    client
    .pause(2000)
    .setValue('input[name="nome_local"]', 'Govinda')
    .setValue('input[name="dia_coleta"]', '20')
    .setValue('input[name="mes_coleta"]', '06')
    .setValue('input[name="ano_coleta"]', '2018')
    .setValue('input[name="item"]', 'agenda')
    .setValue('input[name="quantidade"]', '8')
    .pause(2000)
    .click('#btnSalvaAddColeta')
    .pause(4000)
  },

  'Step thirteen: Editar coleta' : function(client){
    client
    .click('#btnEditColeta')
    .pause(2000)
    .clearValue('input[name="nome_local"]')
    .setValue('input[name="nome_local"]', 'Go')
    .clearValue('input[name="dia_coleta"]')
    .setValue('input[name="dia_coleta"]', '10')
    .clearValue('input[name="mes_coleta"]')
    .setValue('input[name="mes_coleta"]', '05')
    .clearValue('input[name="ano_coleta"]')
    .setValue('input[name="ano_coleta"]', '2019')
    .clearValue('input[name="item"]')
    .setValue('input[name="item"]', 'calendário')
    .clearValue('input[name="quantidade"]')
    .setValue('input[name="quantidade"]', '18')
    .pause(2000)
    .click('#btnSalvaEditColeta')
    .pause(4000)
  },

  'Step fourteen: Deletar coleta' : function(client){
    client
    .click('#btnDeleteColeta')
    .pause(4000)
  },

  'Step fifteen: Clicar no navbar' : function (client){
    client
    .click('#navbarDropdown')
    .pause(1000)
  },

  'Step sixteen: Clicar na tabela de estoque' : function(client){
    client
    .click('#navbarEstoque')
    .pause(4000)
  },

  'Step seventeen: Adicionar estoque' : function(client){
    client
    .click('#btnAddEstoque')
    .pause(1000)
  },

  'Step eighteen: Salvar estoque adicionado' : function(client){
    client
    .pause(2000)
    .setValue('input[name="nome"]', 'Alexa')
    .setValue('input[name="item"]', 'agenda')
    .setValue('input[name="q_recebida"]', '2')
    .setValue('input[name="q_devolvida"]', '06')
    .setValue('textarea[name="obs"]', 'adição de estoque')
    .pause(2000)
    .click('#btnSalvaAddEstoque')
    .pause(4000)
  },

  'Step nineteen: Editar estoque' : function(client){
    client
    .click('#btnEditEstoque')
    .pause(2000)
    .clearValue('input[name="nome"]')
    .setValue('input[name="nome"]', 'Kevon')
    .clearValue('input[name="item"]')
    .setValue('input[name="item"]', 'calendário')
    .clearValue('input[name="q_recebida"]')
    .setValue('input[name="q_recebida"]', '12')
    .clearValue('input[name="q_devolvida"]')
    .setValue('input[name="q_devolvida"]', '08')
    .clearValue('textarea[name="obs"]')
    .setValue('textarea[name="obs"]', 'teste de edição de estoque')
    .pause(2000)
    .click('#btnSalvaEditEstoque')
    .pause(4000)
  },

  'Step twenty: Deletar estoque' : function(client){
    client
    .click('#btnDeleteEstoque')
    .pause(4000)
  },

  'Step twenty-one: Clicar no navbar' : function (client){
    client
    .click('#navbarDropdown')
    .pause(1000)
  },

  'Step twenty-two: Clicar na tabela de eventos' : function(client){
    client
    .click('#navbarEventos')
    .pause(4000)
  },

  'Step twenty-three: Adicionar evento' : function(client){
    client
    .click('#btnAddEventos')
    .pause(1000)
  },

  'Step twenty-four: Salvar evento adicionado' : function(client){
    client
    .pause(2000)
    .setValue('input[name="dia"]', '8')
    .setValue('input[name="mes"]', '12')
    .setValue('input[name="ano"]', '2019')
    .setValue('input[name="evento"]', 'Feira')
    .setValue('input[name="responsavel"]', 'Alexa')
    .setValue('input[name="agenda"]', '06')
    .setValue('input[name="calendario"]', '06')
    .setValue('input[name="a_vendida"]', '04')
    .setValue('input[name="c_vendido"]', '01')
    .setValue('textarea[name="obs"]', 'teste de criação de evento')
    .pause(2000)
    .click('#btnSalvaAddEventos')
    .pause(4000)
  },

  'Step twenty-five: Editar evento' : function(client){
    client
    .click('#btnEditEventos')
    .pause(2000)
    .clearValue('input[name="dia"]')
    .setValue('input[name="dia"]', '18')
    .clearValue('input[name="mes"]')
    .setValue('input[name="mes"]', '11')
    .clearValue('input[name="ano"]')
    .setValue('input[name="ano"]', '2020')
    .clearValue('input[name="evento"]')
    .setValue('input[name="evento"]', 'Encontro vegano')
    .clearValue('input[name="responsavel"]')
    .setValue('input[name="responsavel"]', 'Kevin')
    .clearValue('input[name="agenda"]')
    .setValue('input[name="agenda"]', '16')
    .clearValue('input[name="calendario"]')
    .setValue('input[name="calendario"]', '11')
    .clearValue('input[name="a_vendida"]')
    .setValue('input[name="a_vendida"]', '14')
    .clearValue('input[name="c_vendido"]')
    .setValue('input[name="c_vendido"]', '11')
    .clearValue('textarea[name="obs"]')
    .setValue('textarea[name="obs"]', 'teste de edição de evento')
    .pause(2000)
    .click('#btnSalvaEditEventos')
    .pause(4000)
  },

  'Step twenty-six: Deletar evento' : function(client){
    client
    .click('#btnDeleteEventos')
    .pause(4000)
  },

  'Step twenty-seven: Clicar no navbar' : function (client){
    client
    .click('#navbarDropdown')
    .pause(1000)
  },

  'Step twenty-eight: Clicar na tabela de pontos de venda' : function(client){
    client
    .click('#navbarVenda')
    .pause(4000)
  },

  'Step twenty-nine: Adicionar ponto de venda' : function(client){
    client
    .click('#btnAddVenda')
    .pause(1000)
  },

  'Step thirty: Salvar ponto de venda adicionado' : function(client){
    client
    .pause(2000)
    .setValue('input[name="local"]', 'PetShop')
    .setValue('input[name="endereco"]', 'Rua')
    .setValue('input[name="contato"]', 'Alexa')
    .setValue('input[name="leva"]', 'Kevin')
    .setValue('input[name="v_responsavel"]', 'Kevon')
    .setValue('input[name="agendas"]', '06')
    .setValue('input[name="calendarios"]', '06')
    .setValue('input[name="pago"]', '4')
    .setValue('textarea[name="observacao"]', 'teste de criação de ponto de venda')
    .pause(2000)
    .click('#btnSalvaAddVenda')
    .pause(4000)
  },

  'Step thirty-one: Editar ponto de venda' : function(client){
    client
    .click('#btnEditVenda')
    .pause(3000)
    .clearValue('input[name="local"]')
    .setValue('input[name="local"]', 'Veterinária')
    .clearValue('input[name="endereco"]')
    .setValue('input[name="endereco"]', 'Avendida')
    .clearValue('input[name="contato"]')
    .setValue('input[name="contato"]', 'Mia')
    .clearValue('input[name="leva"]')
    .setValue('input[name="leva"]', 'Alexa')
    .clearValue('input[name="v_responsavel"]')
    .setValue('input[name="v_responsavel"]', 'Gia')
    .clearValue('input[name="agendas"]')
    .setValue('input[name="agendas"]', '26')
    .clearValue('input[name="calendarios"]')
    .setValue('input[name="calendarios"]', '10')
    .clearValue('input[name="pago"]')
    .setValue('input[name="pago"]', '2')
    .clearValue('textarea[name="observacao"]')
    .setValue('textarea[name="observacao"]', 'teste de edição de ponto de venda')
    .pause(2000)
    .click('#btnSalvaEditVenda')
    .pause(4000)
  },

  'Step thirty-two: Editar preco' : function(client){
    client
    .click('#btnEditPreco')
    .pause(2000)
    .clearValue('input[name="p_agenda"]')
    .setValue('input[name="p_agenda"]', '20')
    .clearValue('input[name="p_calendario"]')
    .setValue('input[name="p_calendario"]', '11.75')
    .pause(2000)
    .click('#btnSalvaEditPreco')
    .pause(4000)
  },

  'Step thirty-three: Deletar preco' : function(client){
    client
    .click('#btnDeletePreco')
    .pause(4000)
  },

  'Step thirty-four: Adicionar preco' : function(client){
    client
    .click('#btnAddPreco')
    .pause(1000)
  },

  'Step thirty-five: Salvar preco adicionado' : function(client){
    client
    .pause(2000)
    .setValue('input[name="p_agenda"]', '10.50')
    .setValue('input[name="p_calendario"]', '1')
    .pause(2000)
    .click('#btnSalvaAddPreco')
    .pause(4000)
  },

  'Step thirty-six: Deletar ponto de venda' : function(client){
    client
    .click('#btnDeleteVenda')
    .pause(4000)
  },

  'Step thirty-seven: Clicar no navbar' : function (client){
    client
    .click('#navbarDropdown')
    .pause(1000)
  },

  'Step thirty-eight: Acessar o perfil' : function(client){
    client
    .click('#navbarPerfil')
    .pause(4000)
  },

  'Step thirty-nine: Clicar no navbar' : function (client){
    client
    .click('#navbarDropdown')
    .pause(1000)
  },

  'Step forty: Acessar o cadastramento' : function(client){
    client
    .click('#navbarCadastrar')
    .pause(4000)
    .setValue('input[name="fullname"]', 'Alexa Anil')
    .setValue('input[name="username"]', 'AlexaA')
    .setValue('input[name="password"]', 'teste')
    .setValue('input[name="password1"]', 'teste')
    .pause(2000)
    .click('#btnCadastrar')
    .pause(2000)
  },

  'Step forty-one: Acessar o perfil' : function (client) {
     client
      .click('#navbarPerfil')
      .pause(4000)
  },

  'Step forty-two: Sair da aplicação' : function(client){
    client
    .click('#navbarSair')
    .pause(1000)
    .end();
  }
};
