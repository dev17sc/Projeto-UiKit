cadastroPagadores.factory("FormFact", [
  function() {
    base_obj = function(pessoa) {

      return obj = {
        opened: false,
        new_record: false,
        // listaPessoas: [{pessoa: {}}],

        init: function(pessoa) {
          this.pessoa = pessoa
          this.opened = true
          this.new_record = pessoa.id ? false : true
        },

        close: function(){
          this.pessoa = {}
          this.opened = false
        },
      };
    }

    return base_obj;
  },
]);
