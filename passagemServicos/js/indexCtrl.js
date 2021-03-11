passagemServicos = angular.module("passagemServicos", ["sc.app.helpers"])

passagemServicos.run([
  '$rootScope', 'scAlert', 'scTopMessages',
  function($rootScope, scAlert, scTopMessages) {
    $rootScope.scAlert = scAlert;
    $rootScope.scTopMessages = scTopMessages;
  }
]);

passagemServicos.controller("PassagemServicos::IndexCtrl", [
  'scTopMessages',
  function(scTopMessages) {
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
    vmIndex.salvar = function(passagem, params) {
      if(!params.id) {
        params.id = vmIndex.list.length + 1
        vmIndex.list.unshift(passagem)
        vmIndex.newRecord = false
        console.log('salvando novo')
      } else {
        vmIndex.passagem = passagem
        console.log('editando')
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
        senhaQuemSai: '',
        pessoaEntrou: 'Antônio',
        senhaQuemEntra: '',
        criacao: new Date(),
      },
      {
        id: 2,
        pessoaSaiu: 'Carol',
        senhaQuemSai: '',
        pessoaEntrou: '',
        senhaQuemEntra: '',
        criacao: new Date(),
      },

    ]

    return vmIndex
  }
]);
