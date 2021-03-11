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
      abrir: function(passagem, params) {
        if (!passagem) {
          vmIndex.params = angular.copy(vmIndex.list)
          vmIndex.list = {}
          vmIndex.newRecord = true
        } else {
          vmIndex.params = angular.copy(vmIndex.list)
          vmIndex.list = {passagem}
          passagem.accOpened = true
          passagem.editing = true
        }
      },
      fechar: function(passagem) {
        vmIndex.newRecord = false
        passagem.editing = false
      },
    }


    //Submit do Formulário
    vmIndex.salvar = function(passagem, params) {
      if(!vmIndex.params.id) {
        vmIndex.params.id = vmIndex.list.length + 1
        vmIndex.list.unshift(params)
        vmIndex.newRecord = false
        passagem.criacao = new Date()
      } else {
        vmIndex.passagem = passagem
        passagem.editing = false
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
