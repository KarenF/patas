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

  'Step four: Clicar na tabela de colaboradores' : function(client){
    client
    .click('#navbarColaboradores')
    .pause(2000)
  },

  'Step five: Editar colaboradores' : function(client){
    client
    .click('#btnEditColab')
    .pause(2000)
  },

  'Step six: Salvar colaboradores editados' : function(client){
    client
    .click('#btnSalvaEditColab')
    .pause(2000)
  },

  'Step seven: Retorna para a tabela de colaboradores' : function(client){
    client
    .url('http://localhost:4000/colaboradores')
    .pause(2000)
    .end();
  },
};
