passagemServicos = angular.module("passagemServicos", ["sc.app.helpers"])

passagemServicos.run([
  '$rootScope', 'scAlert', 'scTopMessages',
  function($rootScope, scAlert, scTopMessages) {
    $rootScope.scAlert = scAlert;
    $rootScope.scTopMessages = scTopMessages;
  }
]);

passagemServicos.controller("PassagemServicos::IndexCtrl", [
  function() {
    vmIndex = this


    vmIndex.init = function() {

    }

    // Toggle Accordion
    vmIndex.accToggle = function(passagem) {
      passagem.accOpened = !passagem.accOpened
    }



    //Abrir e Fechar Formulário
    vmIndex.form = false
    vmIndex.formulario = {
      abrir: function() {
        vmIndex.form = true
      },
      fechar: function() {
        vmIndex.form = false
      },
    }

    // Lista de Passagens
    vmIndex.list = [
      {
        id: 1,
        pessoaSaiu: 'Erick Teixeira',
        pessoaEntrou: 'Antônio',
        criacao: new Date(),
      },
      {
        id: 2,
        pessoaSaiu: 'Carol',
        pessoaEntrou: '',
        criacao: new Date(),
      },
    ]

    return vmIndex
  }
]);
