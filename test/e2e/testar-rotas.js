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

  'Step five: Clicar no navbar' : function (client){
    client
    .click('#navbarDropdown')
    .pause(1000)
  },

  'Step six: Clicar na tabela de coleta' : function(client){
    client
    .click('#navbarColeta')
    .pause(2000)
  },

  'Step seven: Clicar no navbar' : function (client){
    client
    .click('#navbarDropdown')
    .pause(1000)
  },

  'Step eight: Clicar na tabela de estoque' : function(client){
    client
    .click('#navbarEstoque')
    .pause(2000)
  },

  'Step nine: Clicar no navbar' : function (client){
    client
    .click('#navbarDropdown')
    .pause(1000)
  },

  'Step ten: Clicar na tabela de eventos' : function(client){
    client
    .click('#navbarEventos')
    .pause(2000)
  },

  'Step eleven: Clicar no navbar' : function (client){
    client
    .click('#navbarDropdown')
    .pause(1000)
  },

  'Step twelve: Clicar na tabela de pontos de venda' : function(client){
    client
    .click('#navbarVenda')
    .pause(2000)
  },

  'Step thirteen: Clicar no navbar' : function (client){
    client
    .click('#navbarDropdown')
    .pause(1000)
  },

  'Step fourteen: Acessar o perfil' : function(client){
    client
    .click('#navbarPerfil')
    .pause(2000)
  },

  'Step fifteen: Clicar no navbar' : function (client){
    client
    .click('#navbarDropdown')
    .pause(1000)
  },

  'Step sixteen: Acessar o cadastramento' : function(client){
    client
    .click('#navbarCadastrar')
    .pause(2000)
  },

  'Step fifteen: Clicar no navbar' : function (client){
    client
    .click('#navbarDropdown')
    .pause(1000)
  },

  'Step seventeen: Sair da aplicação' : function(client){
    client
    .click('#navbarSair')
    .pause(2000)
  },

  'Step eighteen: Retorna para a página de login' : function(client){
    client
    .url('http://localhost:4000')
    .pause(2000)
    .end();
  },
};
