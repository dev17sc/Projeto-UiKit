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

    // Lista de Passagens
    vmIndex.list = [
      {
        id: 1,
        pessoaSaiu: 'Erick Teixeira',
        pessoaEntrou: 'Antônio',
        criacao: new Date(),
      }
    ]

    return vmIndex;
  }
]);
