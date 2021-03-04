passagemServicos = angular.module("passagemServicos", ["sc.app.helpers"])

passagemServicos.run([
  '$rootScope', 'scAlert', 'scTopMessages',
  function($rootScope, scAlert, scTopMessages) {
    $rootScope.scAlert = scAlert;
    $rootScope.scTopMessages = scTopMessages;
  }
]);

passagemServicos.controller("PassagemServicos::IndexCtrl", [
  "FormFact", "PessoasFact",
  function(formFact, indexFact) {
    vmIndex = this

    vmIndex.formFact  = new formFact()
    vmIndex.baseFact = indexFact

    // Index Init
    vmIndex.init = function() {

    }

    // Salvar e Excluir passagem
    vmIndex.handleCtrl = {
      salvar: function(params){
        if(!params.id) {
          params.id = vmIndex.list.length + 1

          vmIndex.list.unshift(params)
        } else {
          passagem = null
          vmIndex.list.forEach(function(it){
            if (it.id == params.id) { return passagem = it }
          })

          angular.extend(passagem, params)
        }
      },

      excluir: function (passagem) {
        vmIndex.list.remove(passagem)
      }
    }

    vmIndex.baseFact.handleCtrl = vmIndex.handleCtrl

    // Abrir formulário de cadastro e de edição Ctrl
    vmIndex.formularioCtrl = {
      abrir: function(passagem) {
        if(!passagem) {
          vmIndex.new_record = true
          vmIndex.formFact.init({})
        } else {
          vmIndex.new_record = false
          vmIndex.formFact.init(passagem)
        }
      }
    }

    // Lista de Passagens
    vmIndex.list = [
      {
        id: 1,
        saiu: 'Erick Teixeira',
        senhaSaiu:'',
        criacao: new Date(),
        categoria: 'CHAVE',
        item: 'Chave da Guarita',
        quantidade: 1,
        entrou: 'Antônio',
        senhaEntrou:'',
      },
    ]

    return vmIndex;
  }
]);
