eventosmodule.exports = {
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

  'Step four: Clicar na tabela de eventos' : function(client){
    client
    .click('#navbarEventos')
    .pause(2000)
  },

  'Step five: Editar eventos' : function(client){
    client
    .click('#btnEditEventos')
    .pause(2000)
  },

  'Step six: Salvar eventos editados' : function(client){
    client
    .click('#btnSalvaEditEventos')
    .pause(2000)
  },

  'Step seven: Retorna para a tabela de eventos' : function(client){
    client
    .url('http://localhost:4000/eventos')
    .pause(2000)
    .end();
  },
};
