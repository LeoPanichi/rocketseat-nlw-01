import express from 'express';

import cors from 'cors';

// NLW - Next Level Week
// eColeta

// Criar pasta server(dentro de projeto), por exemplo
// npm init -y

// Utilizaremos o conceito de API RESTful
// Utilizaremos TypeScript
// TypeScript é um super set de JavaScript, ou seja,
// Um JavaScript com super poderes
// Oferenco tipagem para os objetos
// Ajuda a quando precisar dar manutençao a uma função antiga
// Ajuda a inteligencia da IDE a entender o formato dentro do objeto
// function displayUserInformation (user: User){ ... }
// Parametro user, é de tipagem User. 
// Quando digitar user ponto(.), a IDE consegue sugerir a estrutura dentro dela

// Instalando o TypeScript:
// npm install typescript -D

// Quando importar no arquivo TypeScript (.ts)
// Será apontado (com reticencias aparecendo no começo do nome da biblioteca no comando import):
// Could Not Find a Declaration File For Module 'express'
// Como o TypeScript tem tipagem Dinamica, ao contrario do padrao JavaScript que é Estática
// As bibliotecas (como o express) precisam do tipo, junto com o código
// Por exemplo, o tipo de retorno de função, tipo de retorno de parametro da função, etc
// Algumas bibliotecas já vem com os types, junto com o código
// Outras como o express, precisam ser baixadas em outro pacote
// Muitas vezes na própria mensagem aparece a solução desses casos
// npm install @types/express -D
// Note os tipos são dependencias de desenvolvimento
// Pois, quando a aplicação for ao ar, já estará convertido TS em JS

const app = express();

app.use(cors());

// Para que quando acessemos dados do request, como o body, e não retorne undefined.
// Vamos definir os dados como no formato JSON
app.use(express.json());

// Note que agora quando vc digitar app ponto(.) vc verá todas as opções que ele recebe

// Criando a primeira rota

// Comentando rotas abaixo, foram para teste e didática
/*
const users = [
    'Leo',      //0
    'Mari',     //1
    'Flicka'    //2
];

app.get('/users', (request, response) => {
    //console.log('Listagem de Usuários');

    //response.send('Hello World');

    const search = request.query.search;

    const filteredUsers = search ? users.filter(user => user.includes(search.toString())) : users;

    return response.json(filteredUsers);
})

app.get('/users/:id', (request, response) => {
    // TypeScript precisa que converta para Number para utilizar como parametro do array
    const id = Number(request.params.id);

    return response.json(users[id]);
})

app.post('/users', (request, response) => {
    //console.log(request.body);

    const data = request.body

    const user = {
        ...data
    };
    
    return response.json(user);
})
*/

// Colocar import sempre no começo do arquivo !!!
// Só coloquei aqui para separar da parte de testes iniciais de rotas
import routes from './routes';

// Permite que o arquivo routes gerencia as chamadas HTTP
app.use(routes);

// Colocar import sempre no começo do arquivo !!!
// Só coloquei aqui para separar da parte de testes iniciais de rotas
import path from 'path';
// Como publicar as imagens de uploads
// O segundo parametro é uma função usada para servir arquivos para uma aplicação, como imagens documentos, etc
app.use('/uploads', express.static(path.resolve(__dirname,'..','uploads')));

// Celebrate errors
import {errors} from 'celebrate';

app.use(errors());

// Porta que ouvirá

app.listen(3333);

// Esse script não consegue ser executado com o node
// Pois o node só aceita de entrada JS, e este é um TS
// Como resolver isso:
// Instalar o pacote:
// npm install ts-node -D
// Basicamente é um node de TypeScript
// Lembre sempre, é uma dependencia de Dev
// Execute o npx (executor de pacotes, node_modules/.bin):
// npx ts-node src/server.ts
// Ele te jogará um erro, pois não temos o arquivo de configuração do TypeScript
// Crie o arquivo:
// npx tsc --init
// OU
// npx typescript --init
// Arquivo tsconfig.json criado, praticamente não mexeremos nele
// Execute de novo o npx
// Se não enviar erro e travar o cursor pra proxima linha, quer dizer que está rodando
// Execute o endereço no browser http://localhost:3333/users
// Onde /users, é o primeiro parametro do app.get (chamado de recurso)
// A aba do browser ficará carregando ad eternum
// Os consoles.log aparecerão no terminal, sem destravar a linha
// A função dentro do app.get (segundo parametro) não possui parametros ainda
// Adicionaremos os parametros usados: 
// - request, o que é enviado
// - response, o que é devolvido
// Adicionados e usando funções para dar respostas ao browser
// e.g.: response.send('Hello World');
// Precisa cancelar a execução atual e executar de novo o npx (CTRL+C no terminal)
// Informações enviadas e devolvidas devem ser em JSON, por boas práticas
// Para facilitar, no lugar de response.send, usar response.json
// response.json recebe um objeto ou um array ou um array de objetos

// É muito trabalhoso ter que parar o script e reiniciar a cada atualização
// Vamos instalar:
// npm install ts-node-dev -D
// Sempre como dependencia de Dev
// Esse pacote vai fazer o mesmo que antes e ficar ouvindo por mudanças no codigo
// Podemos rodar, então:
// npx ts-node-dev src/server.ts
// Agora qualquer alteração de código é refletida nas chamadas, sem a necessidade de reinicar o processo
// Mas se for necessario adicionar flags e parametros para esse comando no futuro
// É melhor coloca-lo dentro do package.json dentro de scripts
// Depois disso, apenas rode no terminal:
// npm run <nome do script> 
// Geralmente, chamamos o script de dev

// Quebrando a URL para dar significado aos termos
// http://localhost:3333
// Acima é chamado de rota
// /users (apendado ao final da rota)
// Acima é chamado de recurso
// É o acesso a uma entidade no backend, nesse caso users

// Browser sempre faz chamadas GET, mas existem outras
// Listando todas são:
// GET: Buscar 1 ou mais info
// POST: Criar nova info
// PUT: Atualizar info existente
// DELETE: Deletar info existente (Obvio!)

// Rotas são muito semanticas
// Exemplos:
// POST http://localhost:3333/users = Criar Usuario
// GET http://localhost:3333/users = Listar Usuarios
// GET http://localhost:3333/users/5 = Lista Usuario com ID 5

// Request Param: Parametros que vem na propria rota(/) e se referem a um recurso, obrigatório na maioria das vezes
// Query Param: Parametro opcional, usado como um tipo de filtro, vem após rota(?<field>=<value>), podem ser passados multiplas vezes na mesma chamada
// Request Body: Parametros para criação/atualização de dados, são o corpo da requisição (Obvio!)

// Vamos utilizar o banco de dados SQLite (SQL)
// Pois não precisa instalar nada na máquina
// Será criado o banco num arquivo, .sqlite

// Para acessar essa banco de dados pelo NodeJS
// Usaremos o KnexJS
// É um Query Builder do JavaScript
// Exemplo: SELECT * FROM USERS WHERE USER = 'Leonardo'
// KnexJS: knex('users').where('user', 'Leonardo').select('*')
// Vantagem é que se o Banco de Dados migrar dentre os suportados pelo Knex, não precisa mudar o código

// Criar arquivo routes.ts
// Ele vai conter as rotas do projeto, serão muitas, melhor não deixar tudo neste arquivo

// Vá ao terminal, e instale:
// npm install knex
// npm install sqlite3

// Criar pasta database, abaixo de src
// Crie um arquivo connection.ts dentro

// Identificar tabelas que a aplicação vai usar:
// - Points (Pontos de Coleta)
//      Campos: image, name, email, whatsapp, latitude, longitude, city, uf
// - Items (Items para Coleta)
//      Campos: image, title
// Relacionamento das tabelas acima é N para N
// - Points2Items - Tabela pivot
//      Campos: point_id, item_id

// Criar pasta uploads, e colocar todas as imagens necessarias

// instalar o CORS
// CORS define quais endereços podem acessar nossa API
// npm install cors
// mpn install @types/cors

// Instalar multer para lidar com imagens
// npm install multer
// npm install @types/multer -D

// Para validação de dados existem os pacotes
// yup
// celebrate (integra bem com o express), utiliza o joi por baixo dos panos
// Usaremos o celebrate
// npm install celebrate
// Como ele usa o Joi(@hapi/joi) por baixo, e tem chances do InteliSense não pegar os types
// npm install @types/hapi__joi -D