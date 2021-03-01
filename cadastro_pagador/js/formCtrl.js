cadastroPagadores.controller("FormCtrl", [
  "PessoasFact",
  "scTopMessages",
  function(indexFact, scTopMessages) {
    vmForm = this

    //Form Init Ctrl
    vmForm.initCtrl = {
      init: function (pessoa, formFact) {
        formFact.params = angular.copy(pessoa || {})
      }
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

    //Endereços Ctrl
    vmForm.endFormCtrl = {
      add: function (formFact) {
        formFact.params.endereco ||= [];
        formFact.params.endereco.push({});
      },

      rmv: function (enderecos, formFact) {
        formFact.params.endereco ||= [];
        formFact.params.endereco.remove(enderecos);
      }
    }

    //Conta Bancária Ctrl
    vmForm.contBanCtrl = {
      add: function (formFact) {
        formFact.params.contBan ||= [];
        formFact.params.contBan.push({});
      },

      rmv: function (contaBancaria, formFact) {
        formFact.params.contBan ||= [];
        formFact.params.contBan.remove(contaBancaria);
      }
    }

    return vmForm;
  }
]);
