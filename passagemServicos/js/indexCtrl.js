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
          vmIndex.params = angular.copy(passagem)
          passagem.params = angular.copy(passagem)
          passagem.accOpened = true
          passagem.editing = true
        }
      },
      fechar: function(passagem) {
        if (passagem) {
          passagem.editing = false
          vmIndex.newRecord = false
          console.log(passagem)
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
      } else if(vmIndex.passagem.params.objetos) {
        if (!vmIndex.passagem.params.objetos[0].categoria) {
          scTopMessages.openDanger("Selecione uma categoria para o objeto!", {timeOut: 3000})
        } else if(!vmIndex.passagem.params.objetos[0].itens) {
          scTopMessages.openDanger("É necessário adicionar ao menos 1 item para salvar o objeto!", {timeOut: 3000})
        } else if(vmIndex.passagem.params.objetos[0].itens) {
          if (!vmIndex.passagem.params.objetos[0].itens[0].descricao) {
            scTopMessages.openDanger("Item (descrição) não pode ser vazio!", {timeOut: 3000})
          } else if(!passagem.params.id) {
            vmIndex.newRecord = false
            passagem.params.id = vmIndex.list.length + 1
            passagem.params.criacao = new Date()
            newParams = angular.copy(vmIndex.passagem.params)
            meuParams = angular.copy(vmIndex.passagem)
            angular.extend(passagem.params, newParams)
            vmIndex.list.unshift(meuParams)
            scTopMessages.openSuccess("Registro salvo com sucesso",{timeOut: 2000})
            console.log(passagem)
          } else {
            passagem.params = {}
            passagem.editing = false
            vmIndex.editando = vmIndex.list.map(function(it) {
              return it.id
            }).indexOf(passagem.params.id)
            vmIndex.list[vmIndex.editando] = passagem.params
            scTopMessages.openSuccess("Registro atualizado com sucesso",{timeOut: 2000})
          }
        } else if(!passagem.params.id) {
          vmIndex.newRecord = false
          passagem.params.criacao = new Date()
          passagem.params.id = vmIndex.list.length + 1
          vmIndex.list.unshift(passagem.params)
          newParams = angular.copy(vmIndex.passagem.params)
          angular.extend(passagem.params, newParams)
          scTopMessages.openSuccess("Registro salvo com sucesso",{timeOut: 2000})
          console.log(passagem)
        } else {
          passagem.editing = false
          vmIndex.editando = vmIndex.list.map(function(it) {
            return it.id
          }).indexOf(passagem.params.id)
          vmIndex.list[vmIndex.editando] = passagem.params
          passagem.params = {}
          scTopMessages.openSuccess("Registro atualizado com sucesso",{timeOut: 2000})
        }
      } else if(!passagem.params.id) {
        passagem.params.id = vmIndex.list.length + 1
        vmIndex.newRecord = false
        passagem.params.criacao = new Date()
        newParams = angular.copy(vmIndex.passagem.params)
        angular.extend(passagem.params, newParams)
        vmIndex.list.unshift(passagem.params)
        scTopMessages.openSuccess("Registro salvo com sucesso",{timeOut: 2000})
        console.log(passagem)
      } else {
        vmIndex.editando = vmIndex.list.map(function(it) {
          return it.id
        }).indexOf(passagem.params.id)
        vmIndex.list[vmIndex.editando] = passagem.params
        passagem.editing = false
        passagem.params = {}
        scTopMessages.openSuccess("Registro atualizado com sucesso",{timeOut: 2000})
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
          }).indexOf(vmIndex.passagem.params.objetos[0].categoria.id.id)
          vmIndex.categorias[vmIndex.editCategoria] = categoria
          vmIndex.editandoCategoria = false
          console.log(vmIndex.categorias)
        }
      },
      edit: function(categoria, passagem, params) {
        vmIndex.editandoCategoria = true
        vmIndex.passagem.params.nome = {}
        vmIndex.passagem.categoria = angular.copy(vmIndex.passagem.params.objetos[0].categoria.id.nome)
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
