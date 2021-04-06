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
    vmIndex.formulario = {
      abrir: function(passagem, params) {
        if (!passagem) {
          vmIndex.newRecord = true
          vmIndex.passagem = {params: {}}
        } else {
          passagem.params = angular.copy(passagem)
          vmIndex.passagem = []
          vmIndex.passagem.params = angular.copy(passagem)
          passagem.accOpened = true
          passagem.editing = true
        }
      },
      fechar: function(passagem) {
        if (passagem) {
          passagem.editing = false
          vmIndex.newRecord = false
        } else {
          vmIndex.newRecord = false
        }
      },
    }

    vmIndex.beforeSave = function(passagem) {
      errors = []
      if(!passagem || !passagem.params.pessoaSaiu) {
        msg = "Quem sai não pode ser vazio"
        errors.push(msg)
        scTopMessages.openDanger(errors)
      } else if(passagem.params.pessoaEntrou && !passagem.params.senhaQuemEntra) {
        msg = "É necessário preencher a senha de quem sai e quem entra para realizar a passagem de serviço!"
        errors.push(msg)
        scTopMessages.openDanger(errors)
      } else if(passagem.params.senhaQuemSai && passagem.params.senhaQuemEntra && !passagem.params.pessoaEntrou) {
        msg = "Quem entra não pode ser vazio"
        errors.push(msg)
        scTopMessages.openDanger(errors)
      } else if(vmIndex.passagem.params.objetos) {
        if (!vmIndex.passagem.params.objetos[0].categoria) {
          msg = "Selecione uma categoria para o objeto!"
          errors.push(msg)
          scTopMessages.openDanger(errors)
        } else if(!vmIndex.passagem.params.objetos[0].itens) {
          msg = "É necessário adicionar ao menos 1 item para salvar o objeto!"
          errors.push(msg)
          scTopMessages.openDanger(errors)
        } else if(vmIndex.passagem.params.objetos[0].itens) {
          if (!vmIndex.passagem.params.objetos[0].itens[0].descricao) {
            msg = "Item (descrição) não pode ser vazio!"
            errors.push(msg)
            scTopMessages.openDanger(errors)
          }
        }
      } else {
        if (errors.empty()) {
          vmIndex.salvar(passagem)
        }
      }
    }


    //Submit do Formulário
    vmIndex.salvar = function(passagem) {
      if (!passagem.params.id) {
        vmIndex.newRecord = false
        newParams = angular.copy(passagem.params)
        newParams.id = vmIndex.list.length + 1
        newParams.criacao = new Date()
        newParams.objetos = angular.copy(vmIndex.passagem.params.objetos)
        vmIndex.list.unshift(newParams)
        scTopMessages.openSuccess("Registro salvo com sucesso",{timeOut: 2000})
        console.log(passagem)
        console.log(vmIndex.list)
      } else {
        newParams = angular.copy(passagem.params)
        passagemEdit = vmIndex.list.find((e) => e.id == passagem.id )
        angular.extend(passagemEdit, newParams)
        vmIndex.list[vmIndex.editando] = passagem.params
        scTopMessages.openSuccess("Registro atualizado com sucesso",{timeOut: 2000})
        passagem.editing = false
        passagem.params = {}
        console.log(passagem)
        console.log(vmIndex.list)
      }
    }

    //Excluir passagem
    vmIndex.excluir = function(passagem) {
      vmIndex.list.remove(passagem)
      scTopMessages.openSuccess("Registro excluído com sucesso",{timeOut: 2000})
    }

    //Adicionar e Remover Objeto
    vmIndex.objetoCtrl = {
      add: function(passagem) {
        obj = {}
        if (!passagem.id) {
          passagem.params.objetos ||= []
          passagem.params.objetos.push(obj)
        } else {
          passagem.params.objetos ||= []
          passagem.params.objetos.push(obj)
        }
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
      show: function(novaCategoria, passagem, categoria) {
        vmIndex.novaCategoria = true
        vmIndex.passagem.params.nome = []
      },
      hide: function(passagem, novaCategoria) {
        vmIndex.novaCategoria = false
        vmIndex.editandoCategoria = false
      },
      save: function(passagem, params, categoria, novaCategoria) {
        if (vmIndex.novaCategoria) {
          passagem = []
          params = []
          passagem.params = {nome: ''}
          passagem.params.id = vmIndex.categorias.length + 1
          vmIndex.categorias.unshift(passagem.params)
          vmIndex.novaCategoria = false
          console.log(vmIndex.categorias)
        } else {
          vmIndex.editCategoria = vmIndex.categorias.map(function(it) {
            return it.id
          }).indexOf(vmIndex.passagem.params.objetos[0].categoria.id)
          vmIndex.categorias[vmIndex.editCategoria] = categoria
          vmIndex.editandoCategoria = false
          console.log(vmIndex.categorias)
        }
      },
      edit: function(categoria, passagem, params) {
        vmIndex.editandoCategoria = true
        vmIndex.passagem.params.nome = {}
        vmIndex.passagem.categoria = angular.copy(vmIndex.passagem.params.objetos[0].categoria.nome)
        console.log(vmIndex.passagem.categoria)
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
