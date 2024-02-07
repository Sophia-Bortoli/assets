class Validator {
    constructor() {
        this.validations = [
            'data-min-length',
            'data-max-length',
            'data-only-letters',
            'data-email-validate',
            'data-required',
            'data-equal',
            'data-password-validate',
        ]
    }

    //inicia a validação de todos os campos
    validate(form) {

        //limpa todas as validações antigas
        let currentValidations = document.querySelectorAll('form .error-validation');

        if (currentValidations.length) {
            this.cleanValidations(currentValidations);
        }

        //pegar todos inputs
        let inputs = form.getElementsByTagName('input');
        //trasformar HTMLCollection em arr
        let inputsArray = [...inputs];

        //loop nos inputs e validação mediante aos atributos encontrados
        inputsArray.forEach(function(input, obj) {

            //fazer validação de acordo com o atributo do input
            for(let i=0; this.validations.length > i; i++) {
                if(input.getAttribute(this.validations[i]) != null) {

                    //limpa string para saber o metodo
                    let method = this.validations[i].replace("data-", "").replace("-", "");

                    //valor do input
                    let value = input.getAttribute(this.validations[i])

                    //invoca o methodo
                    this[method](input,value);
                }
            }
        }, this);
    }

    //metodo para validar se tem um minimo de caracteres
    minlength(input, minValue) {

        let inputLength = input.value.length;
        let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;

        if(inputLength < minValue) {
            this.printMessage(input, errorMessage);
        }
    }

    //metodo para validar se passou do maximo de caracteres
    maxlength(input, maxValue) {

        let inputLength = input.value.length;
        let errorMessage = `O campo precisa ter menos que ${maxValue} caracteres`;

        if(inputLength < maxValue) {
            this.printMessage(input, errorMessage);
        }
    }

    //methodo para validar strings que só contem letras
    onlyletters(input) {
        let re = /^[A-Za-z]+$/;;
        let inputValue = input.value;
        let errorMessage = `Este campo não aceita números nem caracteres especiais`;

        if(!re.test(inputValue)) {
            this.printMessage(input, errorMessage);
        }
    }

    //método para validar e-mai
    emailvalidate(input) {
        let re = /\S+@\S+\.\S+/;
        let email = input.value;
        let errorMessage = `Insira um e-mail no padrão exemplo@email.com`;

        if(!re.test(email)) {
            this.printMessage(input, errorMessage);
        }
    }

    //verificar se um campo esta igual ao outro 
    equal(input, inputName) {
        let inputToCompare = document.getElementsByName(inputName)[0];

        let errorMessage = `Este campo precisa ser igual ao ${inputName}`

        if(input.value != inputToCompare.value) {
            this.printMessage(input, errorMessage);
        }
    }

    //metodo para exibir inputs que são necessários l-120
    required(input) {
        let inputValue = input.value;

        if(inputValue === '') {
            let errorMessage = `Este campo é obrigatório`;

            this.printMessage(input, errorMessage);
        }
    }

    //validando campo de senha 
    passwordvalidate(input) {
        //explodir string em array
        let charArr = input.value.split("");

        let uppercases = 0;
        let numbers = 0;

        for(let i = 0; charArr.length > i; i++) {
            if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
                uppercases++;
            } else if(!isNaN(parseInt(charArr[i]))) {
                numbers++;
            }
        }

        if(uppercases === 0 || numbers ===0) {
            let errorMessage = `A senha precisa de um  caractere maiúsculo e um número`;

            this.printMessage(input, errorMessage);
        }
    }
    

    //metodo para imprimir mensagem de erro
    printMessage(input, msg) {
        //checa os erros presentes no input
        let errorQty = input.parentNode.querySelector('.error-validation');

        //imprimir erro só se não tiver erros
        if(errorQty === null) {
            let template = document.querySelector('.error-validation').cloneNode(true);

            template.textContent = msg;

            let inputParent = input.parentNode;

            template.classList.remove('template');

            inputParent.appendChild(template);
        }
    }

    //remove todas as validdações para fazer a checagem novamente
    cleanValidations(validations) {
        validations.forEach(el => el.remove());
    }
}

let form = document.getElementById('register-form');
let submit = document.getElementById('btn-submit');

let validator = new Validator();

//Evento de envio do form, que valida os inputs
submit.addEventListener('click', function(e) {
    e.preventDefault();

    validator.validate(form);

});