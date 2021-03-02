passagemServicos.factory("FormFact", [
  function() {
    base_obj = function(passagem) {

      return obj = {
        opened: false,
        new_record: false,

        init: function(passagem) {
          this.passagem = passagem
          this.opened = true
          // this.new_record = passagem.id ? false : true
        },

        close: function(){
          this.passagem = {}
          this.opened = false
        },
      };
    }

    return base_obj;
  },
]);
