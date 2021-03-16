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
  function(scTopMessages,) {
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
        } else {

          vmIndex.params = angular.copy(passagem)
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
      if(!vmIndex.params || !vmIndex.params.pessoaSaiu) {
        scTopMessages.openDanger("Quem sai não pode ser vazio",{timeOut: 3000})
        vmIndex.pessoaSaiuErro = true
      } else if(vmIndex.params.pessoaEntrou && !vmIndex.params.senhaQuemEntra) {
        scTopMessages.openDanger("É necessário preencher a senha de quem sai e quem entra para realizar a passagem de serviço!",{timeOut: 3000})
        vmIndex.senhaErro = true
      } else if(vmIndex.params.senhaQuemSai && vmIndex.params.senhaQuemEntra && !vmIndex.params.pessoaEntrou) {
         scTopMessages.openDanger("Quem entra não pode ser vazio",{timeOut: 3000})
         vmIndex.pessoaEntrouErro = true
      } else if(!vmIndex.params.id) {
        scTopMessages.openSuccess("Registro salvo com sucesso",{timeOut: 2000})
        vmIndex.params.id = vmIndex.list.length + 1
        vmIndex.list.unshift(vmIndex.params)
        vmIndex.newRecord = false
        vmIndex.params.criacao = new Date()
        vmIndex.params = {}
      } else {
        scTopMessages.openSuccess("Registro salvo com sucesso",{timeOut: 2000})
        vmIndex.editando = vmIndex.list.map(function(it) {
          return it.id
        }).indexOf(passagem.id)
        vmIndex.list[vmIndex.editando] = vmIndex.params
        passagem.editing = false
      }
    }

    //Excluir passagem
    vmIndex.excluir = function(passagem) {
      scTopMessages.openSuccess("Registro excluído com sucesso",{timeOut: 2000})
      vmIndex.list.remove(passagem)
    }

    //Adicionar e Remover Objeto
    vmIndex.objeto = {
      add: function(params) {
        vmIndex.list.objetos.push({})
      },
      rmv: function(objeto) {
        vmIndex.list.objetos.remove(objeto)
      }
    }

    //Adicionar e Remover Item
    vmIndex.item = {
      add: function(params) {
        vmIndex.list.itens.push({})
      },
      rmv: function(item) {
        vmIndex.list.itens.remove(item)
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
        objetos: [{categoria: 'Chave', item: [{descricao: 'Chave da Guarita', quantidade: 1}]}]
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
