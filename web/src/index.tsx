import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

// NLW - Next Level Week
// eColeta

// Utilizaremos o React
// React é uma biblioteca para construção de interfaces
// Constrói SPA (Single Page Application), parte do codigo compartilhado nas paginas dentro da aplicação
// Exemplo, quando vc troca de tela de visualizar cliente para cadastrar, o header nao muda, barra lateral nao muda etc
// Código é separado em componentes - Componentização
// Mais organizado
// Divisão de Responsabilidade:
// - Back-End = Regra de Negócio (API Restful, por exemplo)
// - Front-End = Interface (React)

// Para a criação da aplicação web, usaremos um pacote do proprio Facebook que já cria uma estrutura React
// npx create-react-app web --template=typescript
// Não é necessario criar a pasta como fazemos antes, ele cria automaticamente a pasta web, nesse caso
// No terminal, entramos na pasta, e rodando:
// npm start
// Abrirá o browser com live reload, ou seja, já tem um development server rodando

// Limpando o projeto
// Deletar todos os arquivos da pasta public, exceto index.html
// Deletar da pasta src todos exceto: App.css, App.tsx, index.tsxreact-app-env.d.ts
// Deletar o README.MD da raiz

// Limpar o index.html, tirar as referencias dos arquivos deletados
// Limpar o index.tsx, tirar as referencias dos arquivos deletados
// Limpar o App.tsx, tirar as referencias dos arquivos deletados
// Limpar conteudo do App.css

// JSX: Sintaxe do XML dentro do JavaScript
// EXTENSÃO .TSX DO ARQUIVO É TYPESCRIPT COM JSX
// esse return desses componentes como 'tags de HTML'

// Criar dentro de src, arquivo Header.tsx
// Para servir de exemplo para referencia de tipagens no React com props

// Vá até o Google Fonts
// Como estamos usando no App.css o Roboto e o Ubuntu
// Selecione Roboto 400 e Ubuntu Bold 700
// Vá em Embed, e copie o <link>
// Cole no nosso HTML

// Criar dentro de src, pasta pages
// Dentro de pages, pasta Home
// Dentro de Home, index.tsx
// Importe Home no App.tsx
// Crie o styles.css dentro do Home
// Instale:
// npm install react-icons
// Utilização de icones famosos como FeatherIcons, Material Icons, Font Awesome, etc
// Dentro de pages, pasta CreatePoint
// Dentro de CreatePoint, index.tsx
// Importe CreatePoint no App.tsx

// Instalar:
// npm install react-router-dom
// npm install @types/react-router-dom -D
// Criar arquivo abaixo de src, routes.ts

// Para integrar o mapa no nosso formulário
// Usaremos o Leaflet
// O Google Maps, precisaria criar uma conta no google API e por mais que o plano gratuito seja extenso, precisaria cadastrar cartao de credito
// Instalar:
// npm install leaflet
// npm install react-leaflet
// npm install @types/react-leaflet -D
// Vá no Quick Start Guide do Leaflet
// Copie o CSS dele e coloque no index.html

// Para poder interagir com o Back End
// Instale o axios
// npm install axios
// Criar dentro de src, pasta services
// Aqui será contido chamadas para fora da aplicação ReactJS
// Criar  arquivo api.ts, dentro de services

// Para upload de imagens instalar:
// npm install react-dropzone

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
