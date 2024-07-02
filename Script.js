document.getElementById('cadastro-form').addEventListener('submit', function(event) {
    let isValid = true;

    // Validação de CPF
    const cpfInput = document.getElementById('cpf');
    const cpfError = document.getElementById('cpf-error');
    if (!validaCPF(cpfInput.value)) {
        cpfError.textContent = 'CPF inválido.';
        isValid = false;
    } else {
        cpfError.textContent = '';
    }

    // Confirmação de E-mail
    const emailInput = document.getElementById('email');
    const emailConfirmInput = document.getElementById('email-confirm');
    const emailError = document.getElementById('email-error');
    if (emailInput.value !== emailConfirmInput.value) {
        emailError.textContent = 'Os e-mails não coincidem.';
        isValid = false;
    } else {
        emailError.textContent = '';
    }

    // Confirmação de Senha
    const senhaInput = document.getElementById('senha');
    const senhaConfirmInput = document.getElementById('senha-confirm');
    const senhaError = document.getElementById('senha-error');
    if (senhaInput.value !== senhaConfirmInput.value) {
        senhaError.textContent = 'As senhas não coincidem.';
        isValid = false;
    } else {
        senhaError.textContent = '';
    }

    if (!isValid) {
        event.preventDefault();
    }
});

// Validação de CPF
function validaCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    return true;
}

// Preenchimento automático de endereço com base no CEP
document.getElementById('cep').addEventListener('blur', function() {
    const cep = this.value.replace(/\D/g, '');
    if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    document.getElementById('endereco').value = data.logradouro;
                    document.getElementById('bairro').value = data.bairro;
                    document.getElementById('cidade').value = data.localidade;
                    document.getElementById('estado').value = data.uf;
                } else {
                    document.getElementById('cep-error').textContent = 'CEP não encontrado.';
                }
            })
            .catch(error => console.error('Erro ao buscar o CEP:', error));
    } else {
        document.getElementById('cep-error').textContent = 'CEP inválido.';
    }
});
