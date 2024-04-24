"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Atracao = void 0;
const DatabaseModel_1 = require("./DatabaseModel");
const Habitat_1 = require("./Habitat");
/**
 * Pool de conexão do banco de dados
 */
const database = new DatabaseModel_1.DatabaseModel().pool;
/**
 * Representa uma atração em um zoológico.
 */
class Atracao {
    /**
     * Cria uma nova instância de Atracao.
     *
     * @param _nome O nome da atração.
     * @param _atracaos A lista de atracaos presentes na atração.
     */
    constructor(_nome) {
        /**
         * A lista de atracaos presentes na atração.
         */
        this.habitatAtracao = new Habitat_1.Habitat("");
        this.nomeAtracao = _nome;
    }
    /**
     * Obtém o nome da atração.
     *
     * @returns O nome da atração.
     */
    getNomeAtracao() {
        return this.nomeAtracao;
    }
    /**
     * Define o nome da atração.
     *
     * @param _nomeAtracao O nome a ser atribuído à atração.
     */
    setNomeAtracao(_nomeAtracao) {
        this.nomeAtracao = _nomeAtracao;
    }
    /**
     * Obtém a lista de atracaos presentes na atração.
     *
     * @returns A lista de atracaos da atração.
     */
    getatracaos() {
        return this.habitatAtracao;
    }
    /**
     * Define a lista de atracaos da atração.
     *
     * @param _atracaos A lista de atracaos a ser atribuída à atração.
     */
    setatracao(_habitat) {
        this.habitatAtracao = _habitat;
    }
    /**
     * Retorna uma lista com todos as atrações cadastradas no banco de dados
     *
     * @returns Lista com todos as atrações cadastradas no banco de dados
     */
    static listarAtracoes() {
        return __awaiter(this, void 0, void 0, function* () {
            // Cria uma lista (array) vazia do tipo atracao
            const listaDeAtracoes = [];
            // Construção da query para selecionar as informações de um atracao
            const querySelectAtracao = `SELECT * FROM atracao;`;
            try {
                // Faz a consulta no banco de dados e retorna o resultado para a variável queryReturn
                const queryReturn = yield database.query(querySelectAtracao);
                // Percorre todas as linhas da queryReturn e acessa cada objeto individualmente
                queryReturn.rows.forEach(atracao => {
                    // Coloca o objeto dentro da lista de atrações
                    listaDeAtracoes.push(atracao);
                });
                // retorna a lista de atrações para quem chamou a função
                return listaDeAtracoes;
            }
            catch (error) {
                // Caso dê algum erro na query do banco, é lançado o erro para quem chamou a função
                console.log('Erro no modelo');
                console.log(error);
                return "error, verifique os logs do servidor";
            }
        });
    }
    /**
     * Implementação da classe cadastrarAtracao
     */
    static cadastrarAtracao(atracao, idHabitat) {
        return __awaiter(this, void 0, void 0, function* () {
            // Cria uma variável do tipo booleano para guardar o status do resultado da query
            let insertResult = false;
            let queryInsertAtracao;
            try {
                if (!idHabitat) {
                    // Construção da query para inserir as informações de um Mamifero. A query irá retornar o ID gerado para o animal pelo banco de dados
                    queryInsertAtracao = `INSERT INTO atracao (nomeatracao) 
                                            VALUES 
                                            ('${atracao.getNomeAtracao().toUpperCase()}');`;
                }
                else {
                    // Construção da query para inserir as informações de um Mamifero. A query irá retornar o ID gerado para o animal pelo banco de dados
                    queryInsertAtracao = `INSERT INTO atracao (nomeatracao, idhabitat) 
                                            VALUES 
                                            ('${atracao.getNomeAtracao().toUpperCase()}', ${idHabitat});`;
                }
                // Faz a query de insert no banco de dados, passando para o banco as informações do objeto recebibo como parâmetro pela função
                yield database.query(queryInsertAtracao)
                    // Testa para ter certeza que foi possível inserir os dados no banco
                    .then((resultAtracao) => {
                    if (resultAtracao.rowCount != 0) {
                        // Se o número de linhas for diferente de zero, a operação deu certo e o valor VERDADEIRO é atribuido na variável
                        insertResult = true;
                    }
                });
                // Retorna VERDADEIRO para quem chamou a função, indicando que a operação foi realizada com sucesso
                return insertResult;
            }
            catch (error) {
                // Imprime o erro no console
                console.log(error, insertResult);
                // Caso a inserção no banco der algum erro, é restorno o valor FALSO para quem chamou a função
                return insertResult;
            }
        });
    }
}
exports.Atracao = Atracao;
//# sourceMappingURL=Atracao.js.map