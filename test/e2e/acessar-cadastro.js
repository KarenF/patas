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

  'Step four: Acessar o cadastramento' : function (client){
    client
    .click('#navbarCadastrar')
    .pause(1000)
    .end();
  },
 };
