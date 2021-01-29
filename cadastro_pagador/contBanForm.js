myapp.controller("contBanCtrl", [
  "$scope", "scAlert", "scTopMessages",
  function(s, scAlert, scTopMessages) {

    s.show_contBanForm = false

    s.contBanFormOpen = function() {
      s.show_contBanForm = !s.show_contBanForm
    }
  }
]);
