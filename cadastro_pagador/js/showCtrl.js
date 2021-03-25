cadastroPagadores.controller("Pagadores::ItemCtrl", [
  "FormFact",
  function(formFact) {
    vmItem = this

    vmItem.formFact = new formFact()

    //Show init Ctrl
    vmItem.init = function (pessoa) {
      pessoa.acc = { opened: false }
    }

    //Toggle pessoa Ctrl
    vmItem.accToggle = function(pessoa) {
      pessoa.acc.opened = !pessoa.acc.opened
    }

    vmItem.formularioCtrl = {
      abrir: function(pessoa, formFact) {
        if (!pessoa.acc.opened){ vmItem.accToggle(pessoa) }
        formFact.init(pessoa)
      }
    }

    return vmItem
  }
]);
