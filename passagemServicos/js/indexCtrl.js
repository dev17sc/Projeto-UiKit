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
          vmIndex.newRecord = true
          vmIndex.objetos = []
          console.log('criando nova passagem')
        } else {
          vmIndex.params = angular.copy(passagem)
          passagem.accOpened = true
          passagem.editing = true
          console.log('editando a passagem')
        }
      },
      fechar: function(passagem) {
        vmIndex.newRecord = false
        passagem.editing = false
      },
    }

    //Submit do Formulário
    vmIndex.salvar = function(passagem, params) {
      if(!params || !params.pessoaSaiu) {
        scTopMessages.openDanger("Quem sai não pode ser vazio",{timeOut: 3000})
        vmIndex.pessoaSaiuErro = true
      } else if(params.pessoaEntrou && !params.senhaQuemEntra) {
        scTopMessages.openDanger("É necessário preencher a senha de quem sai e quem entra para realizar a passagem de serviço!",{timeOut: 3000})
        vmIndex.senhaErro = true
      } else if(params.senhaQuemSai && params.senhaQuemEntra && !params.pessoaEntrou) {
         scTopMessages.openDanger("Quem entra não pode ser vazio",{timeOut: 3000})
         vmIndex.pessoaEntrouErro = true
      } else if(!params.id) {
        scTopMessages.openSuccess("Registro salvo com sucesso",{timeOut: 2000})
        params.id = vmIndex.list.length + 1
        vmIndex.list.unshift(params)
        vmIndex.newRecord = false
        params.criacao = new Date()
        console.log('salvando nova passagem')
      } else {
        scTopMessages.openSuccess("Registro salvo com sucesso",{timeOut: 2000})
        vmIndex.params = passagem
        passagem.editing = false
        console.log('salvando edição')
      }
    }

    //Excluir passagem
    vmIndex.excluir = function(passagem) {
      vmIndex.list.remove(passagem)
    }

    //Adicionar e Remover Objeto
    vmIndex.objeto = {
      add: function(params) {
        vmIndex.objetos.push({})
      },
      rmv: function(objeto) {
        vmIndex.objetos.remove(objeto)
      }
    }

    //Adicionar e Remover Item
    vmIndex.item = {
      add: function(params) {
        vmIndex.itens.push({})
      },
      rmv: function(item) {
        vmIndex.itens.remove(item)
      }
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

    vmIndex.objetos = [
      {
        id: 1,
        categoria:'Chave',
      },
    ]

    vmIndex.itens = [
      {
        id: 1,
        descricao: 'Chave da guarita',
        quantidade: 1,
      },
    ]

    return vmIndex
  }
]);
