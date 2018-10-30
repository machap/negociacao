/**
* Estados de uma requisição ajax
* 0: requisição ainda não iniciada
* 1: conexão com o servidor estabelecida
* 2: requisição recebida
* 3: processando requisição
* 4: requisição está concluída e a resposta está pronta
*/
class NegociacaoService {

    constructor() {
        this._http = new HttpService();
    }

    obterNegociacoesDaSemana() {

        return this._http
            .get('negociacoes/semana')
            .then(negociacoes => {
                console.log(negociacoes);
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana');
            });
    }

    obterNegociacoesDaSemanaAnterior() {

        return this._http
            .get('negociacoes/anterior')
            .then(negociacoes => {
                console.log(negociacoes);
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana anterior');
            });
    }

    obterNegociacoesDaSemanaRetrasada() {

        return this._http
            .get('negociacoes/retrasada')
            .then(negociacoes => {
                console.log(negociacoes);
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana retrasada');
            });
        }

    obterNegociacoes() {

        return Promise.all([
            this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()
        ]).then(periodos => {

            let negociacoes = periodos
                .reduce((dados, periodo) => dados.concat(periodo), [])
                .map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor));

            return negociacoes;
        }).catch(erro => {
            throw new Error(erro);
        });
    }
}