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
    passagem = {}
    vmIndex.newRecord = false
    vmIndex.formulario = {
      abrir: function(passagem, params) {
        if (!passagem) {
          vmIndex.newRecord = true
          vmIndex.passagem = {params: {}}
        } else {
          passagem.params = angular.copy(passagem)
          passagem.accOpened = true
          passagem.editing = true
          console.log(passagem)
          console.log(params)
        }
      },
      fechar: function(passagem) {
        if (passagem) {
          passagem.editing = false
          vmIndex.newRecord = false
        console.log(passagem)
        console.log(params)
        } else {
          vmIndex.newRecord = false
        }
      },
    }

    //Submit do Formulário
    vmIndex.salvar = function(passagem, params) {
      if(!passagem || !passagem.params.pessoaSaiu) {
        scTopMessages.openDanger("Quem sai não pode ser vazio",{timeOut: 3000})
        passagem.pessoaSaiuErro = true
      } else if(passagem.params.pessoaEntrou && !passagem.params.senhaQuemEntra) {
        scTopMessages.openDanger("É necessário preencher a senha de quem sai e quem entra para realizar a passagem de serviço!",{timeOut: 3000})
        passagem.senhaErro = true
      } else if(passagem.params.senhaQuemSai && passagem.params.senhaQuemEntra && !passagem.params.pessoaEntrou) {
         scTopMessages.openDanger("Quem entra não pode ser vazio",{timeOut: 3000})
         passagem.pessoaEntrouErro = true
      } else if(!passagem.params.id) {
        scTopMessages.openSuccess("Registro salvo com sucesso",{timeOut: 2000})
        passagem.params.id = vmIndex.list.length + 1
        vmIndex.list.unshift(passagem.params)
        vmIndex.newRecord = false
        passagem.params.criacao = new Date()
        newParams = angular.copy(vmIndex.passagem.params)
        angular.extend(passagem.params, newParams)
        console.log(passagem)
        console.log(params)
      } else {
        scTopMessages.openSuccess("Registro salvo com sucesso",{timeOut: 2000})
        vmIndex.editando = vmIndex.list.map(function(it) {
          return it.id
        }).indexOf(passagem.params.id)
        vmIndex.list[vmIndex.editando] = passagem.params
        passagem.editing = false
        passagem.params = {}
      }
    }

    //Excluir passagem
    vmIndex.excluir = function(passagem) {
      scTopMessages.openSuccess("Registro excluído com sucesso",{timeOut: 2000})
      vmIndex.list.remove(passagem)
    }

    //Adicionar e Remover Objeto
    vmIndex.objetoCtrl = {
      add: function(passagem) {
        obj = { item: []}
        passagem.params.objetos ||= []
        passagem.params.objetos.push(obj)
      },
    }

    // Adicionar e Remover Item
    vmIndex.itemCtrl = {
      add: function(objeto) {
        item = { descricao: '', quantidade: 1}
        objeto.itens ||= []
        objeto.itens.push(item)
      },
    }

    // Adicionar e Remover Categoria
    vmIndex.categoriaCtrl = {
      categoria: {},
      passagem: {},
      show: function(novaCategoria) {
        vmIndex.novaCategoria = true
        vmIndex.passagem.categoria = {}
      },
      hide: function(passagem, novaCategoria) {
        vmIndex.novaCategoria = false
      },
      add: function(passagem, categoria, novaCategoria) {
        if (!vmIndex.categorias.id) {
          categoria.categoria.id = vmIndex.categorias.length + 1
          vmIndex.categorias.unshift(categoria.categoria)
          vmIndex.novaCategoria = false
        } else {
          vmIndex.editCategoria = vmIndex.categorias.map(function(it) {
            return it.id
          }).indexOf(vmIndex.categorias.id)
          vmIndex.categorias[vmIndex.editCategoria] = categoria.nome
        }
      },
      edit: function(categoria, passagem, params) {
        vmIndex.passagem.params.objetos = angular.copy(categoria.nome)
        vmIndex.novaCategoria = true
      }
    }

    // Lista de Categorias
    vmIndex.categorias = [
      {
        id: 1,
        nome: 'CHAVE',
      },
      {
        id: 2,
        nome: 'EQUIPAMENTO',
      },
    ]

    // Lista de Passagens
    vmIndex.list = [
      {
        id: 1,
        pessoaSaiu: 'Erick Teixeira',
        senhaQuemSai: '',
        pessoaEntrou: 'Antônio',
        senhaQuemEntra: '',
        criacao: new Date(),
        objetos: [],
      },
      {
        id: 2,
        pessoaSaiu: 'Carol',
        senhaQuemSai: '',
        pessoaEntrou: '',
        senhaQuemEntra: '',
        criacao: new Date(),
        objetos: [],
      },
    ]

    return vmIndex
  }
]);
