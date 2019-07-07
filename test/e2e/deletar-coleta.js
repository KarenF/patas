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

  'Step four: Clicar na tabela de coleta' : function(client){
    client
    .click('#navbarColeta')
    .pause(2000)
  },

  'Step five: Deletar coleta' : function(client){
    client
    .click('#btnDeleteColeta')
    .pause(2000)
  },

  'Step six: Exibe novamente a tabela de coleta' : function(client){
    client
    .url('http://localhost:4000/coleta')
    .pause(2000)
    .end();
  },
};
