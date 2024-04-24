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
exports.Habitat = void 0;
const DatabaseModel_1 = require("./DatabaseModel");
/**
 * Pool de conexão do banco de dados
 */
const database = new DatabaseModel_1.DatabaseModel().pool;
/**
 * Representa um habitat no zoológico, onde os animais vivem.
 */
class Habitat {
    /**
     * Cria uma nova instância de Habitat.
     *
     * @param _nome O nome do habitat.
     * @param _listaAnimais A lista de animais que habitam o habitat.
     */
    constructor(_nome) {
        /**
         * A lista de animais que habitam este habitat.
         */
        this.listaAnimais = [];
        this.nomeHabitat = _nome;
    }
    /**
     * Obtém o nome do habitat.
     *
     * @returns O nome do habitat.
     */
    getNomeHabitat() {
        return this.nomeHabitat;
    }
    /**
     * Define o nome do habitat.
     *
     * @param _nome O nome a ser atribuído ao habitat.
     */
    setNomeHabitat(_nome) {
        this.nomeHabitat = _nome;
    }
    /**
     * Obtém a lista de animais do habitat.
     *
     * @returns A lista de animais do habitat.
     */
    getListaAnimais() {
        return this.listaAnimais;
    }
    /**
     * Define a lista de animais do habitat.
     *
     * @param _listaAnimais A lista de animais a ser atribuída ao habitat.
     */
    setListaAnimais(_listaAnimais) {
        this.listaAnimais = _listaAnimais;
    }
    /**
     * Retorna uma lista com todos os habitats cadastrados no banco de dados
     *
     * @returns Lista com todos os habitats cadastrados no banco de dados
     */
    static listarHabitats() {
        return __awaiter(this, void 0, void 0, function* () {
            // Cria uma lista (array) vazia do tipo habitat
            const listaDeHabitats = [];
            // Construção da query para selecionar as informações de um habitat
            const querySelectHabitat = `SELECT * FROM habitat;`;
            try {
                // Faz a consulta no banco de dados e retorna o resultado para a variável queryReturn
                const queryReturn = yield database.query(querySelectHabitat);
                // Percorre todas as linhas da queryReturn e acessa cada objeto individualmente
                queryReturn.rows.forEach(habitat => {
                    // Coloca o objeto dentro da lista de habitats
                    listaDeHabitats.push(habitat);
                });
                // retorna a lista de habitats para quem chamou a função
                return listaDeHabitats;
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
     * Cadastra um objeto do tipo Habitat no banco de dados
     *
     * @param habitat Objeto do tipo Habitat
     * @returns **true** caso sucesso, **false** caso erro
     */
    static cadastrarHabitat(habitat) {
        return __awaiter(this, void 0, void 0, function* () {
            // Cria uma variável do tipo booleano para guardar o status do resultado da query
            let insertResult = false;
            try {
                // Construção da query para inserir as informações de um Mamifero. A query irá retornar o ID gerado para o animal pelo banco de dados
                const queryInsertHabitat = `INSERT INTO habitat (nomehabitat) 
                                        VALUES 
                                        ('${habitat.getNomeHabitat().toUpperCase()}');`;
                // Faz a query de insert no banco de dados, passando para o banco as informações do objeto recebibo como parâmetro pela função
                yield database.query(queryInsertHabitat)
                    // Testa para ter certeza que foi possível inserir os dados no banco
                    .then((resultHabitat) => {
                    if (resultHabitat.rowCount != 0) {
                        // Se o número de linhas for diferente de zero, a operação deu certo e o valor VERDADEIRO é atribuido na variável
                        insertResult = true;
                    }
                });
                // Retorna VERDADEIRO para quem chamou a função, indicando que a operação foi realizada com sucesso
                return insertResult;
            }
            catch (error) {
                // Imprime o erro no console
                console.log(error);
                // Caso a inserção no banco der algum erro, é restorno o valor FALSO para quem chamou a função
                return insertResult;
            }
        });
    }
    /**
     * Retorna uma lista com todos os habitats cadastrados e os animais vinculados a eles, caso o Habitat não tenha nenhum animal é retornado uma lista vazia
     *
     * @returns Lista com todos os habitats cadastrados e os animais vinculados a eles
     */
    static exibirAnimaisPorHabitat(idHabitat) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Retorna todos os animais de um Habitat (informado como parâmetro). Caso o Habitat não tenha nenhum animal é retornado uma lista vazia
                const querySelectHabitatsComAnimais = `
                SELECT
                    h.idHabitat,
                    h.nomeHabitat,
                    a.idAnimal,
                    a.nomeAnimal,
                    a.idadeAnimal,
                    a.generoAnimal
                FROM
                    Habitat h
                LEFT JOIN
                    Animal_Habitat ah ON h.idHabitat = ah.idHabitat
                LEFT JOIN
                    Animal a ON ah.idAnimal = a.idAnimal
                WHERE 
                    h.idHabitat = ${idHabitat} AND ah.idAnimal IS NOT NULL
                ORDER BY
                    h.idHabitat, a.idAnimal;
            `;
                const queryReturn = yield database.query(querySelectHabitatsComAnimais);
                return queryReturn.rows;
            }
            catch (error) {
                console.log('Erro no modelo');
                console.log(error);
                return "error, verifique os logs do servidor";
            }
        });
    }
    /**
     * Insere um animal no habitat
     *
     * @param idAnimal ID do animal
     * @param idHabitat ID do habitat
     * @returns **true** caso sucesso, **false** caso erro
     */
    static inserirAnimalHabitat(idAnimal, idHabitat) {
        return __awaiter(this, void 0, void 0, function* () {
            // Cria uma variável do tipo booleano para guardar o status do resultado da query
            let insertResult = false;
            try {
                // Construção da query para inserir as informações de um Mamifero. A query irá retornar o ID gerado para o animal pelo banco de dados
                const queryInsertAnimalHabitat = `INSERT INTO Animal_Habitat(idAnimal, idHabitat)
                                                VALUES
                                                (${idAnimal}, ${idHabitat});`;
                // Faz a query de insert no banco de dados, passando para o banco as informações do objeto recebibo como parâmetro pela função
                yield database.query(queryInsertAnimalHabitat)
                    // Testa para ter certeza que foi possível inserir os dados no banco
                    .then((result) => {
                    if (result.rowCount != 0) {
                        // Se o número de linhas for diferente de zero, a operação deu certo e o valor VERDADEIRO é atribuido na variável
                        insertResult = true;
                    }
                });
                // Retorna VERDADEIRO para quem chamou a função, indicando que a operação foi realizada com sucesso
                return insertResult;
            }
            catch (error) {
                // Imprime o erro no console
                console.log(error);
                // Caso a inserção no banco der algum erro, é restorno o valor FALSO para quem chamou a função
                return insertResult;
            }
        });
    }
}
exports.Habitat = Habitat;
//# sourceMappingURL=Habitat.js.map