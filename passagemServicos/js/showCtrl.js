passagemServicos.controller("PassagemServicos::ItemCtrl", [
  "FormFact",
  function(formFact) {
    vmItem = this

    vmItem.formFact = new formFact()

    //Show init Ctrl
    vmItem.init = function (passagem) {
      passagem.acc = { opened: false }
    }

    //Toggle passagem Ctrl
    vmItem.accToggle = function(passagem) {
      passagem.acc.opened = !passagem.acc.opened
    }

    // Abrindo Edição
    vmItem.formularioCtrl = {
      abrir: function(passagem, formFact) {
        if (!passagem.acc.opened){ vmItem.accToggle(passagem) }
        formFact.init(passagem)
      }
    }

    // vmItem.objetos =
    // [
    //   {
    //     id: 1,
    //     nome: 'CHAVE',
    //   },
    // ]

    // vmItem.itens =
    // [
    //   {
    //     id: 1,
    //     nome: 'Chave da guarita',
    //     quantidade: 1,
    //   },
    // ]

    return vmItem
  }
]);
