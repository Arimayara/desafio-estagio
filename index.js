const myArgs = process.argv.slice(2);
let caminhoArquivo = myArgs[0];

// # Ler aquivo csv
const fs = require('fs');
fs.readFile(caminhoArquivo, 'utf8', function (err, data) {

    // # dividir/separar a string e retorna um array
    let dataArray = data.split(/\r?\n/);
    dataArray = dataArray.filter(function (el) {
        return el != '';
    });

    // # validação de erros
    let erros = [];

    for (let i = 1; i < dataArray.length; i++) {
        let linha = dataArray[i];
        let coluna = linha.split(','); // quebra de linha por ,

        // # separando as colunas por tipo
        let nomeCompleto = coluna[0];
        let email = coluna[1];
        let cpf = coluna[2];
        let celular = coluna[3];
        let idade = coluna[4];
        let data_nascimento = coluna[5];
        let data_cadastro = coluna[6];

        // Validações
        // # Nome
        let tamanhoMaxNome = 25;

        if (nomeCompleto.length > tamanhoMaxNome)
            erros.push(`O nome "${nomeCompleto}" está com tamanho de 
            ${nomeCompleto.length} caracteres, sendo que o máximo é 
            ${tamanhoMaxNome} caracteres.`);

        // # Email
        let nomeArr = nomeCompleto.split(' ');
        let nomesParaRemover = ['da', 'de', 'do'];

        nomeArr = nomeArr.filter(function (el) {
            return !nomesParaRemover.includes(el);
        });

        let primeiroNome = nomeArr.length < 1 ? "" : nomeArr[0];
        let ultimoNome = nomeArr.length < 2 ? "" : nomeArr[nomeArr.length - 1];
        let emailEsperado = (primeiroNome + "." + ultimoNome + "@gmail.com").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();


        // # Email
        if (email.toLowerCase() != emailEsperado)
            erros.push(`O e-mail "${email}" está no formato errado, 
            o certo seria "${emailEsperado}".`);


        // usando regex para as validações
        // # CPF
        if (!(/(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)/.test(cpf)))
            erros.push(`O CPF "${cpf}" está no formato errado, 
            o certo seria "xxx.xxx.xxx-xx".`);


        // # Cecular
        if (!(/^\(?\d{2}\)?[\s-]?[\s9]?\d{3}-?\d{5}$/.test(celular)))
            erros.push(`O celular "${celular}" está no formato errado,
            o certo seria "(xx) xxxxx-xxxx".`);




        // # Data_nascimento
        if (!(/(^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$)/.test(data_nascimento)))
            erros.push(`A data de nascimento "${data_nascimento}" está no formato errado,
            o certo seria "dd/mm/YYYY". `);



        // # Data_cadastro
        if (!(/(^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$)/.test(data_cadastro)))
            erros.push(`A data de cadastro "${data_cadastro}" está no formato errado,
            o certo seria "dd/mm/YYYY". `);

    };

    for (let i = 1; i < erros.length; i++) {
        console.log(erros[i]);
    }


});


