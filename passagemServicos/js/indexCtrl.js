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

    //Filtro Ctrl
    vmIndex.filtro = {

      avancado: false,

      toggle: function () {
        console.log('abrindo; fechando')
        vmIndex.avancado = !vmIndex.avancado;
      },
    }

    // Excluir Pagador Ctrl
    vmIndex.handleCtrl = {
      salvar: function(params){
        if(!params.id) {
          params.id = vmIndex.passagem.length + 1

          vmIndex.passagem.unshift(params)
        } else {
          pagador = null
          vmIndex.passagem.forEach(function(it){
            if (it.id == params.id) { return pagador = it }
          })

          angular.extend(pagador, params)
        }
      },

      excluir: function (passagem) {
        // vmIndex.passagem.splice(vmIndex.passagem.indexOf(passagem), 1)
        vmIndex.passagem.remove(passagem)
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

    // Lista das passagens
    vmIndex.list = [
      {
        id: 1,
        nome: 'Erick Teixeira',
        criacao: new Date(),
      },

    ]

    return vmIndex;
  }
]);
