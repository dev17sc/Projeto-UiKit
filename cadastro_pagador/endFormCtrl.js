myapp.controller("EndCtrl", [
  "$scope", "scAlert", "scTopMessages",
  function(s, scAlert, scTopMessages) {

    s.show_endForm = false

    s.endFormOpen = function() {
      s.show_endForm = !s.show_endForm
    }

  //  s.enderecos = []

  //  s.addEnd = function()->
  //    novo_endereco = { principal: false, chave: valor, chave: valor, chave: { cidade: 'goiania' } }
  //    s.enderecos.push(novo_endereco)

  //  s.rmvEnd = function(end)->
  //    s.enderecos.remove(end)
  }
]);
