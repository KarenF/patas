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

  'Step four: Clicar na tabela de eventos' : function(client){
    client
    .click('#navbarEventos')
    .pause(2000)
  },

  'Step five: Adicionar eventos' : function(client){
    client
    .click('#btnAddEventos')
    .pause(2000)
  },

  'Step six: Salvar eventos adicionados' : function(client){
    client
    .click('#btnSalvaAddEventos')
    .pause(2000)
    .end();
  },
};
