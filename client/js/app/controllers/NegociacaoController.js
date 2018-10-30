class NegociacaoController {

    constructor() {

        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacaoView')),
            'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto');

        this._ordemAtual = '';
    }

    adiciona(event) {
        event.preventDefault();
        try {
            this._listaNegociacoes.adiciona(this._criaNegociacao());
            this._mensagem.texto = 'Negociação adicionada com sucesso';
            this._limpaFormulario();
        } catch (erro) {
            this._mensagem.texto = erro;
        }
    }

    importaNegociacoes() {

        let service = new NegociacaoService();
        service
            .obterNegociacoes()
            .then(negociacoes => negociacoes.forEach(negociacao => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = 'Negociações do período importadas'
            }))
            .catch(erro => this._mensagem.texto = erro);
        /*
        let service = new NegociacoesService();

        Promise.all([
            service.obterNegociacoesDaSemana(),
            service.obterNegociacoesDaSemanaAnterior(),
            service.obterNegociacoesDaSemanaRetrasada()
        ]).then(negociacoes => {
            negociacoes.reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
                .forEach(negociacoes => this._listaNegociacoes.adiciona(negociacoes));
            this._mensagem.texto = 'Negociações importadas com sucesso';
        }).catch(erro => this._mensagem.texto = '');
        //-------------------------------------------
        /*
        service.obterNegociacoesDaSemana()
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = 'Negociação obtida com sucesso';
            }).catch(erro => this._mensagem.texto = erro);

            service.obterNegociacoesDaSemanaAnterior()
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = 'Negociação obtida com sucesso';
            }).catch(erro => this._mensagem.texto = erro);

            service.obterNegociacoesDaSemanaRetrasada()
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = 'Negociação obtida com sucesso';
            }).catch(erro => this._mensagem.texto = erro);
        //------------------------------------------------------------------------
                service.obterNegociacoesDaSemana((erro, negociacoes) =>{
                    if(erro){
                        this._mensagem.texto = erro;
                        return;
                    }
        
                    negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                    this._mensagem.texto = 'Negociações importadas com sucesso !'
                });
        
                service.obterNegociacoesDaSemanaAnterior((erro, negociacoes) =>{
                    if(erro){
                        this._mensagem.texto = erro;
                        return;
                    }
        
                    negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                    this._mensagem.texto = 'Negociações importadas com sucesso !'
                });
        
                service.obterNegociacoesDaRetrasada((erro, negociacoes) =>{
                    if(erro){
                        this._mensagem.texto = erro;
                        return;
                    }
        
                    negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                    this._mensagem.texto = 'Negociações importadas com sucesso !'
                });
        */
    }

    apaga() {
        this._listaNegociacoes.esvazia();

        this._mensagem.texto = 'Lista de negociaçoes esvaziadas';
        //this._mensagemView.update(this._mensagem);
    }

    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value);
    }
    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }

    ordena(coluna) {
        if (this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((p, s) => p[coluna] - s[coluna]);
        }
        this._ordemAtual = coluna;

    }
}