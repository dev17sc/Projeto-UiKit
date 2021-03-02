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

    // Init Ctrl
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
          params.id = vmIndex.porteiros.length + 1

          vmIndex.porteiros.unshift(params)
        } else {
          pagador = null
          vmIndex.porteiros.forEach(function(it){
            if (it.id == params.id) { return pagador = it }
          })

          angular.extend(pagador, params)
        }
      },

      excluir: function (pessoa) {
        // vmIndex.porteiros.splice(vmIndex.porteiros.indexOf(pessoa), 1)
        vmIndex.porteiros.remove(pessoa)
      }
    }
    vmIndex.baseFact.handleCtrl = vmIndex.handleCtrl

    // Abrir formulário de cadastro e de edição Ctrl
    vmIndex.formularioCtrl = {
      abrir: function(pessoa) {
        if(!pessoa) {
          vmIndex.new_record = true
          vmIndex.formFact.init({})
        } else {
          vmIndex.new_record = false
          vmIndex.formFact.init(pessoa)
        }
      }
    }

    return vmIndex;
  }
]);
