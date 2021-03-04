passagemServicos.controller("FormCtrl", [
  "PessoasFact",
  "scTopMessages",
  function(indexFact, scTopMessages) {
    vmForm = this

      //Init Passagem
      vmForm.init = function (passagem, formFact) {
        vmForm.formFact = formFact
        vmForm.formFact.params = angular.copy(passagem || {})
      }

    //Salvar Ctrl
    vmForm.save = function (passagem, formFact) {
      if(!formFact.params.saiu) {
        scTopMessages.openDanger("Quem sai não pode ser vazio", {timeOut: 3000})
        vmForm.nomeErro = true
      } else if(formFact.params.entrou && !formFact.params.senhaEntrou) {
        scTopMessages.openDanger("É necessário preencher a senha de quem sai e quem entra para realizar a passagem de serviço!", {timeOut: 3000})
        vmForm.senhaErro = true
      } else {
        vmForm.formFact.params.criacao = new Date()
        indexFact.handleCtrl.salvar(formFact.params)
        formFact.close()
        scTopMessages.openSuccess("Registro salvo com sucesso", {timeOut: 2000})
      }
    }

    // Adicionar e Remover Objetos
    vmForm.objetoCtrl = {
      add: function (objeto) {
          vmForm.formFact.params.objetos ||= [];
          vmForm.formFact.params.objetos.push(objeto);
        },

      rmv: function (objeto, formFact) {
        vmForm.formFact.params.objetos ||= [];
        vmForm.formFact.params.objetos.remove(objeto);
      },
    }

    // Adicionar e Remover Itens
    vmForm.itemCtrl = {
      add: function (item) {
        vmForm.formFact.params.itens ||= [];
        vmForm.formFact.params.itens.push(item);
        console.log('Adicionando')
      },

      rmv: function (item, formFact) {
        vmForm.formFact.params.itens ||= [];
        vmForm.formFact.params.itens.remove(item);
      },
    }

    return vmForm;
  }
]);
