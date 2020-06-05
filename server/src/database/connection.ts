import knex from 'knex';
// Biblioteca para lidar com caminhos dentro do projeto
import path from 'path';

// __dirname é o diretorio atual desse arquivo
const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname,'database.sqlite')
    },
    useNullAsDefault: true,
});

export default connection;

// Migrations (no Knex) = Histórico do Banco de Dados
// Define ações que precisam ser realizadas dependendo do ponto que está o projeto
// Boa prática para times de desenvolvedores

// Criar pasta chamada migrations, dentro de database
// Criar as migragtions dentro dessa pasta
// Mas, importante, colocar sempre um numero a frente do nome
// Pq serão executadas na ordem que aparece na pasta
// 00_create_points.ts
// 01_create_items.ts
// 02_create_points2items.ts
// Precisam ter as funções async up e down
// - UP para criar a tabela, com commmit
// - DOWN para um rollback, ou nesse caso, deletar a tabela
// Para que o migrations funcione, precisa-se criar o arquivo:
// knexfile.ts, na raiz do projeto (nesse caso, pasta server)
// Executar no terminal
// npx knex --knexfile knexfile.ts migrate:latest
// como knexfile.ts está na raiz do projeto, pode-se passar só o nome
// Criar um script no package.json
// "knex:migrate": "knex migrate:latest --knexfile knexfile.ts migrate:latest"
// Criar uma pasta chamada seeds, dentro de database
// Utilizará funcionalidade de mesmo nome do Knex para ter dados pré carregados/cadastrados
// Criar arquivo de items default na pasta seeds
// Adicionar na knexfile, assim como foi feito pra migrations
// Criar script no package.json
// knex --knexfile knexfile.ts seed:run

// Para que o script dev não fique observando todos os arquivos
// Pois tem muitos no node_modules
// altere-o para:
// "dev": "npx ts-node-dev --ignore-watch node_modules src/server.ts"
// Caso queira performar ainda mais rápido:
// "dev": "npx ts-node-dev --transpileOnly --ignore-watch node_modules src/server.ts"

// Quando o arquivo de routes ficar muito carregado de código e com várias chamadas diferentes
// Podemos organizar seu conteudo em Controllers
// Crie um pasta controllers, dentro de src
// Crie os arquivos:
// - ItemsController.ts
// - PointsController.ts
// Então, importe esses arquivos no router

// Padrão da comunidade NodeJS
// Metodos do Controller
// - INDEX: mostrar todos
// - SHOW: mostrar 1
// - CREATE(store): insert
// - UPDATE
// - DELETE(destroy)