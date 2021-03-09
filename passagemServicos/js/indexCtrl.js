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
    vmIndex.opened = false
    vmIndex.accToggle = function() {
      vmIndex.opened = !vmIndex.opened
    }


    //Abrir e Fechar Formulário
    vmIndex.show = false
    vmIndex.formulario = {
      abrir: function() {
        vmIndex.show = true
      },
      fechar: function() {
        vmIndex.show = false
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
