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
    vmIndex.newRecord = false
    vmIndex.formulario = {
      abrir: function(passagem) {
        if (!passagem) {
          vmIndex.newRecord = true
        } else {
          passagem.accOpened = true
          passagem.editing = true
        }
      },
      fechar: function(passagem) {
        vmIndex.newRecord = false
      },
    }

    //Submit do Formulário
    vmIndex.salvar = function(passagem) {
      if(passagem) {
        vmIndex.list.unshift(passagem)
        vmIndex.newRecord = false
        passagem = {}
      } else {
        vmIndex.passagem = passagem
      }
    }

    //Excluir passagem
    vmIndex.excluir = function(passagem) {
      vmIndex.list.remove(passagem)
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
