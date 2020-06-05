import React from 'react';
import './App.css';

//import Header from './Header';
//import { useState } from 'react';
// Para atualizar dinamicamente algo em tela
// Utilizamos o conceito de estado
// Se eu apenas atualizo um valor que previamente já foi renderizando em tela, ele normalmente não atualiza
// Usando State, conseguimos mudar isso
// React sempre re-renderiza tudo que depende do que está no nosso estado, até mesmo que estiver em outros componentes
/*
function App() {
  // Antigamente era assim que se dava o return no React
  // return React.createElement('h1', {
  //   children: 'Hello World'
  // })

  // Função useState, sempre tem o retorno descrito abaixo
  // Boas praticas, é fazer como desetruturação, e pegar a função e o valor separadamente
  const [counter, setCounter] = useState(0); // [valor do estado, função para atualiza-lo]

  function handleClickButton(){
    setCounter(counter + 1);
  }

  return (
    <div>
      <Header title='Ecoleta'/>
      <h1>{counter}</h1>
      <button type='button' onClick={handleClickButton}>Aumentar</button>
    </div>
  );
}
*/

import Routes from './routes';

function App(){
  return (
    <Routes />
  )
}

export default App;
