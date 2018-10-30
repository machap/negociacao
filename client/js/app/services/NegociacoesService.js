/**
* Estados de uma requisição ajax
* 0: requisição ainda não iniciada
* 1: conexão com o servidor estabelecida
* 2: requisição recebida
* 3: processando requisição
* 4: requisição está concluída e a resposta está pronta
*/
class NegociacoesService {

    constructor() {
        this._http = new HttpService();
    }

    obterNegociacoesDaSemana() {

        return new Promise((resolve, reject) => {

            this._http.get('negociacoes/semana')
                .then(negociacoes => {
                    console.log(negociacoes);
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                }).catch(erro => {
                    console.log(erro);
                    reject('Não foi possiel obter as negociações da semana');
                });
        });
    }

    obterNegociacoesDaSemanaAnterior() {

        return new Promise((resolve, reject) => {

            this._http.get('negociacoes/anterior')
                .then(negociacoes => {
                    console.log(negociacoes);
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                }).catch(erro => {
                    console.log(erro);
                    reject('Não foi possiel obter as negociações da anterior');
                });
        });
    }

    obterNegociacoesDaSemanaRetrasada() {

        return new Promise((resolve, reject) => {

            this._http.get('negociacoes/retrasada')
                .then(negociacoes => {
                    console.log(negociacoes);
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                }).catch(erro => {
                    console.log(erro);
                    reject('Não foi possiel obter as negociações da retrasada');
                });
        });
    }
}