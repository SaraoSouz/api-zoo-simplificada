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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const Ave_1 = require("./model/Ave");
const Habitat_1 = require("./model/Habitat");
const Atracao_1 = require("./model/Atracao");
const DatabaseModel_1 = require("./model/DatabaseModel");
const server = (0, express_1.default)();
const port = 3000;
server.use(express_1.default.json());
server.use((0, cors_1.default)());
// Rota padrão para testes (NÃO USAR EM AMBIENTE PRODUÇÃO)
server.get('/', (req, res) => {
    res.send('Hello World!');
});
server.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(`Informações: ${username} - ${password}`);
});
/**
 * Listar informações cadastradas no banco de dados
 */
// Listar todos as aves cadastradas
server.get('/listar-aves', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // cria objeto aves e atribui a ele o retorno do método listarAves
    const aves = yield Ave_1.Ave.listarAves();
    // retorna a lista de aves em formato json
    res.status(200).json(aves);
}));
// Listar todos os habitats cadastradas
server.get('/habitats', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // cria objeto habitats e atribui a ele o retorno do método listarHabitats
    const habitats = yield Habitat_1.Habitat.listarHabitats();
    // retorna a lista de habitats em formato json
    res.status(200).json(habitats);
}));
// Listar todas as atrações cadastradas
server.get('/atracoes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // cria objeto atracoes e atribui a ele o retorno do método listarAtracoes
    const atracoes = yield Atracao_1.Atracao.listarAtracoes();
    // retorna a lista de atracoes em formato json
    res.status(200).json(atracoes);
}));
/**
 * Cadastrar informações no sistema
 */
// Cadastra informações de uma nova ave
server.post('/novo/ave', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Desestruturando objeto recebido pelo front-end
    const { nome, idade, genero, envergadura, idHabitat } = req.body;
    // Instanciando objeto Ave
    const novaAve = new Ave_1.Ave(nome, idade, genero, envergadura);
    // Chama o método para persistir a ave no banco de dados
    const result = yield Ave_1.Ave.cadastrarAve(novaAve, idHabitat);
    // Verifica se a query foi executada com sucesso
    if (result) {
        return res.status(200).json('Ave cadastrado com sucesso');
    }
    else {
        return res.status(400).json('Não foi possível cadastrar o ave no banco de dados');
    }
}));
// Cadastra informações de um novo habitat
server.post('/novo/habitat', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Desestruturando objeto recebido pelo front-end
    const { nomeHabitat } = req.body;
    // Instanciando objeto Habitat
    const novoHabitat = new Habitat_1.Habitat(nomeHabitat);
    // Chama o método para persistir o habitat no banco de dados
    const result = yield Habitat_1.Habitat.cadastrarHabitat(novoHabitat);
    // Verifica se a query foi executada com sucesso
    if (result) {
        return res.status(200).json('Habitat cadastrado com sucesso');
    }
    else {
        return res.status(400).json('Não foi possível cadastrar o habitat no banco de dados');
    }
}));
// Cadastra informações de uma nova atracao
server.post('/novo/atracao', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Desestruturando objeto recebido pelo front-end
    const { nomeAtracao, idHabitat } = req.body;
    // Instanciando objeto Ave
    const novaAtracao = new Atracao_1.Atracao(nomeAtracao);
    let result = false;
    // verifica se o idHabitat não veio vazio do front-end
    if (idHabitat != undefined) {
        // Chama o método para persistir a atracao no banco de dados associando ao id
        result = yield Atracao_1.Atracao.cadastrarAtracao(novaAtracao, idHabitat);
    }
    else {
        // Chama o método para persistir a atracao no banco de dados
        result = yield Atracao_1.Atracao.cadastrarAtracao(novaAtracao);
    }
    // verifica se a query foi executada com sucesso
    if (result) {
        return res.status(200).json('Atração cadastrado com sucesso');
    }
    else {
        return res.status(400).json('Não foi possível cadastrar a atração no banco de dados');
    }
}));
new DatabaseModel_1.DatabaseModel().testeConexao().then((resbd) => {
    if (resbd) {
        server.listen(port, () => {
            console.info(`Servidor executando no endereço http://localhost:${port}/`);
        });
    }
    else {
        console.log(`Não foi possível conectar ao banco de dados`);
    }
});
//# sourceMappingURL=app.js.map