module.exports = {
  'Step one: Acessar o site e fazer login' : function (client) {
    client
    .url('http://localhost:4000/login')
    .click('#btnLogin')
    .pause(4000)
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

  'Step four: Clicar na tabela de pontos de venda' : function(client){
    client
    .click('#navbarVenda')
    .pause(2000)
  },

  'Step five: Editar pontos de venda' : function(client){
    client
    .click('#btnEditVenda')
    .pause(2000)
  },

  'Step six: Salvar pontos de venda editados' : function(client){
    client
    .click('#btnSalvaEditVenda')
    .pause(2000)
  },

  'Step seven: Retorna para a tabela de pontos de venda' : function(client){
    client
    .url('http://localhost:4000/venda')
    .pause(2000)
    .end();
  },
};
