"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Animal = void 0;
const DatabaseModel_1 = require("./DatabaseModel");
/**
 * Pool de conexão do banco de dados
 */
const database = new DatabaseModel_1.DatabaseModel().pool;
/**
 * Representa um animal no zoológico.
 */
class Animal {
    /**
     * Cria uma nova instância de Animal.
     *
     * @param _nome O nome do animal.
     * @param _idade A idade do animal.
     * @param _genero O gênero do animal.
     */
    constructor(_nome, _idade, _genero) {
        this.nomeAnimal = _nome;
        this.idadeAnimal = _idade;
        this.generoAnimal = _genero;
    }
    /**
     * Obtém o nome do animal.
     *
     * @returns O nome do animal.
     */
    getNomeAnimal() {
        return this.nomeAnimal;
    }
    /**
     * Define o nome do animal.
     *
     * @param nome O nome a ser atribuído ao animal.
     */
    setNomeAnimal(nome) {
        this.nomeAnimal = nome;
    }
    /**
     * Obtém a idade do animal.
     *
     * @returns A idade do animal.
     */
    getIdadeAnimal() {
        return this.idadeAnimal;
    }
    /**
     * Define a idade do animal.
     *
     * @param idade A idade a ser atribuída ao animal.
     */
    setIdadeAnimal(idade) {
        this.idadeAnimal = idade;
    }
    /**
     * Obtém o gênero do animal.
     *
     * @returns O gênero do animal.
     */
    getGeneroAnimal() {
        return this.generoAnimal;
    }
    /**
     * Define o gênero do animal.
     *
     * @param genero O gênero a ser atribuído ao animal.
     */
    setGeneroAnimal(genero) {
        this.generoAnimal = genero;
    }
}
exports.Animal = Animal;
//# sourceMappingURL=Animal.js.map