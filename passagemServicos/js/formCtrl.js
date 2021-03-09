passagemServicos.controller("PassagemServicos::FormCtrl", [
  function() {
    vmForm = this

    vmForm.init = function() {

    }

    vmForm.opened = false
    vmForm.formulario = {
      abrir: function() {
        vmForm.opened = true
      },
      fechar: function() {
        vmForm.opened = false
      }
    }



    return vmForm
  }
])
