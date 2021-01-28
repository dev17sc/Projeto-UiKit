myapp.controller("FormCtrl", [
  "$scope", "scAlert", "scTopMessages",
  function(s, scAlert, scTopMessages) {

    s.show_form = false

    s.abrirForm = function() {
      s.show_form = !s.show_form
    }
  }
]);
