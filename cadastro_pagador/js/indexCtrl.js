cadastroPagadores = angular.module("cadastroPagadores", ["sc.app.helpers"])

cadastroPagadores.run([
  '$rootScope', 'scAlert', 'scTopMessages',
  function($rootScope, scAlert, scTopMessages) {
    $rootScope.scAlert = scAlert;
    $rootScope.scTopMessages = scTopMessages;
  }
]);

cadastroPagadores.controller("Pagadores::IndexCtrl", [
  "FormFact", "PessoasFact",
  function(formFact, indexFact) {
    vmIndex = this

    vmIndex.formFact  = new formFact()
    vmIndex.baseFact = indexFact

    // Init Ctrl
    vmIndex.init = function() {
      // vmIndex.formFact.listaPessoas = vmIndex.pagadores
    }

    //Filtro Ctrl
    vmIndex.filtro = {
      show: false,

      localizar: function () {
        vmIndex.buscar = {};
        vmIndex.buscarPor = '$';
      },

      filtrar: function() {
        vmIndex.buscar = vmIndex.aplicarFiltro;
        vmIndex.buscar = vmIndex.aplicarFiltroAvancado;
      },

      toogle: function () {
        vmIndex.show = !vmIndex.show;
      },
    }

    // Excluir Pagador Ctrl
    vmIndex.handleCtrl = {
      salvar: function(params){
        if(!params.id) {
          params.id = vmIndex.pagadores.length + 1

          vmIndex.pagadores.unshift(params)
        } else {
          pagador = null
          vmIndex.pagadores.forEach(function(it){
            if (it.id == params.id) { return pagador = it }
          })

          angular.extend(pagador, params)
        }
      },

      excluir: function (pessoa) {
        // vmIndex.pagadores.splice(vmIndex.pagadores.indexOf(pessoa), 1)
        vmIndex.pagadores.remove(pessoa)
      }
    }
    vmIndex.baseFact.handleCtrl = vmIndex.handleCtrl

    // Abrir formulário de cadastro e de edição Ctrl
    vmIndex.formularioCtrl = {
      abrir: function(pessoa) {
        if(!pessoa) {
          vmIndex.new_record = true
          vmIndex.formFact.init({})
        } else {
          vmIndex.new_record = false
          vmIndex.formFact.init(pessoa)
        }
      }
    }

    vmIndex.pagadores = [
      {
        id: 1,
        nome: 'Alice Alcântara',
        cpf: '123.456.789-10',
        rg: 'xxxxxx',
        nascimento: new Date(),
        profissao: 'Teste',
        email: 'seucondominio@gmail.com',
        email_alt: 'teste@teste.com',
        telefone: '(62) 9 1234-5678',
        endereco: [],
      },
      {
        id: 2,
        nome: 'Ana Claudia',
        cpf: 'xxx.xxx.xxx-xx',
        rg: 'xxxxxx',
        nascimento: new Date(),
        profissao: 'Teste',
        email: 'teste@teste.com',
        email_alt: 'teste@teste.com',
        telefone: '(xx) x xxxx-xxxx',
        endereco: [],
      },
      {
        id: 3,
        nome: 'Camila Andrade',
        cpf: 'xxx.xxx.xxx-xx',
        rg: 'xxxxxx',
        nascimento: new Date(),
        profissao: 'Teste',
        email: 'teste@teste.com',
        email_alt: 'teste@teste.com',
        telefone: '(xx) x xxxx-xxxx',
        endereco: [],
      },
      {
        id: 4,
        nome: 'Carla Inácio',
        cpf: 'xxx.xxx.xxx-xx',
        rg: 'xxxxxx',
        nascimento: new Date(),
        profissao: 'Teste',
        email: 'teste@teste.com',
        email_alt: 'teste@teste.com',
        telefone: '(xx) x xxxx-xxxx',
        endereco: [],
      },
      {
        id: 5,
        nome: 'Cristiane Silva',
        cpf: 'xxx.xxx.xxx-xx',
        rg: 'xxxxxx',
        nascimento: new Date(),
        profissao: 'Teste',
        email: 'teste@teste.com',
        email_alt: 'teste@teste.com',
        telefone: '(xx) x xxxx-xxxx',
        endereco: [],
      },
      {
        id: 6,
        nome: 'Daniela Santos',
        cpf: 'xxx.xxx.xxx-xx',
        rg: 'xxxxxx',
        nascimento: new Date(),
        profissao: 'Teste',
        email: 'teste@teste.com',
        email_alt: 'teste@teste.com',
        telefone: '(xx) x xxxx-xxxx',
        endereco: [],
      },
      {
        id: 7,
        nome: 'Eduarda Lourenzzo',
        cpf: 'xxx.xxx.xxx-xx',
        rg: 'xxxxxx',
        nascimento: new Date(),
        profissao: 'Teste',
        email: 'teste@teste.com',
        email_alt: 'teste@teste.com',
        telefone: '(xx) x xxxx-xxxx',
        endereco: [],
      },
      {
        id: 8,
        nome: 'Erika Albuquerque',
        cpf: 'xxx.xxx.xxx-xx',
        rg: 'xxxxxx',
        nascimento: new Date(),
        profissao: 'Teste',
        email: 'teste@teste.com',
        email_alt: 'teste@teste.com',
        telefone: '(xx) x xxxx-xxxx',
        endereco: [],
      },
      {
        id: 9,
        nome: 'Ingrid Lopez',
        cpf: 'xxx.xxx.xxx-xx',
        rg: 'xxxxxx',
        nascimento: new Date(),
        profissao: 'Teste',
        email: 'teste@teste.com',
        email_alt: 'teste@teste.com',
        telefone: '(xx) x xxxx-xxxx',
        endereco: [],
      },
      {
        id: 10,
        nome: 'Ketlyn Alves',
        cpf: 'xxx.xxx.xxx-xx',
        rg: 'xxxxxx',
        nascimento: new Date(),
        profissao: 'Teste',
        email: 'teste@teste.com',
        email_alt: 'teste@teste.com',
        telefone: '(xx) x xxxx-xxxx',
        endereco: [],
      },
      {
        id: 11,
        nome: 'Lara Gomes',
        cpf: 'xxx.xxx.xxx-xx',
        rg: 'xxxxxx',
        nascimento: new Date(),
        profissao: 'Teste',
        email: 'teste@teste.com',
        email_alt: 'teste@teste.com',
        telefone: '(xx) x xxxx-xxxx',
        endereco: [],
      },
      {
        id: 12,
        nome: 'Lorena Santos',
        cpf: 'xxx.xxx.xxx-xx',
        rg: 'xxxxxx',
        nascimento: new Date(),
        profissao: 'Teste',
        email: 'teste@teste.com',
        email_alt: 'teste@teste.com',
        telefone: '(xx) x xxxx-xxxx',
        endereco: [],
      },
      {
        id: 13,
        nome: 'Marco Aurélio F. S. Fonseca',
        cpf: 'xxx.xxx.xxx-xx',
        cpf: 'xxx.xxx.xxx-xx',
        rg: 'xxxxxx',
        nascimento: new Date(),
        profissao: 'Teste',
        email: 'teste@teste.com',
        email_alt: 'teste@teste.com',
        telefone: '(xx) x xxxx-xxxx',
        endereco: [],
      },
      {
        id: 14,
        nome: 'Pétala Vasconselos',
        cpf: 'xxx.xxx.xxx-xx',
        rg: 'xxxxxx',
        nascimento: new Date(),
        profissao: 'Teste',
        email: 'teste@teste.com',
        email_alt: 'teste@teste.com',
        telefone: '(xx) x xxxx-xxxx',
        endereco: [],
      },
      {
        id: 15,
        nome: 'Rita Estela',
        cpf: 'xxx.xxx.xxx-xx',
        rg: 'xxxxxx',
        nascimento: new Date(),
        profissao: 'Teste',
        email: 'teste@teste.com',
        email_alt: 'teste@teste.com',
        telefone: '(xx) x xxxx-xxxx',
        endereco: [],
      },
    ]

    return vmIndex;
  }
]);
