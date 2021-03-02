passagemServicos.controller("FormCtrl", [
  "PessoasFact",
  "scTopMessages",
  function(indexFact, scTopMessages) {
    vmForm = this

      vmForm.init = function (passagem, formFact) {
        formFact.params = angular.copy(passagem || {})
      }


    //Salvar Ctrl
    vmForm.save = function (passagem, formFact) {
      if(!formFact.params.nome) {
        scTopMessages.openDanger("Preencha o campo Nome", {timeOut: 3000})
        vmForm.nomeErro = true
      }

      indexFact.handleCtrl.salvar(formFact.params)
      formFact.close()
    }

    vmForm.objetoCtrl = {
      add: function (formFact) {
        formFact.params.objeto ||= [];
        formFact.params.objeto.push({});
      },

      rmv: function (objetos, formFact) {
        formFact.params.objeto ||= [];
        formFact.params.objeto.remove(objetos);
      }
    }

    return vmForm;
  }
]);
