// Semantic UI form validation
(function ($) {
  $('.ui.form').form({
    name: {
      identifier: 'name',
      rules: [{
        type: 'empty',
        prompt: 'Digite o seu nome'
      }]
    },
    email: {
      identifier: 'email',
      rules: [{
        type: 'empty',
        prompt: 'Digite o seu email'
      }, {
        type: 'email',
        prompt: 'Email inválido'
      }]
    },
    password: {
      identifier: 'password',
      rules: [{
        type: 'empty',
        prompt: 'Digite sua senha'
      }, {
        type: 'minLength[3]',
        prompt: 'Senhas devem ter pelo menos {ruleValue} caracteres'
      }]
    },
    confirmPassword: {
      identifier: 'confirmPassword',
      rules: [{
        type: 'empty',
        prompt: 'Confirme sua senha'
      }, {
        type: 'match[password]',
        prompt: 'Senha não coincidem'
      }]
    },
    terms: {
      identifier: 'terms',
      rules: [
        {
          type   : 'checked',
          prompt : 'Você deve aceitar os Termos de Compromisso'
        }
      ]
    }
  });
}(jQuery));