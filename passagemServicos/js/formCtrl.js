passagemServicos.controller("FormCtrl", [
  "PessoasFact",
  "scTopMessages",
  function(indexFact, scTopMessages) {
    vmForm = this

      vmForm.init = function (pessoa, formFact) {
        formFact.params = angular.copy(pessoa || {})
      }


    //Salvar Ctrl
    vmForm.save = function (pessoa, formFact) {
      if(!formFact.params.nome) {
        scTopMessages.openDanger("Preencha o campo Nome", {timeOut: 3000})
        vmForm.nomeErro = true
      }

      indexFact.handleCtrl.salvar(formFact.params)
      formFact.close()
    }

    return vmForm;
  }
]);
