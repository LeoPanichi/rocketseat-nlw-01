// ARQUIVO FEITO PARA TESTE

import React from 'react';

// Transformando em const
// function Header(){
//     return (
//         <header>
//             <h1>Ecoleta</h1>
//         </header>
//     );
// }

// Se quisermos passar propriedades para componentes, como esse
// Precisamos fazer como abaixo:
// Definir uma tipagem para a const
// FC = Function Component
// Pois é um componente que recebe uma função, vide a arrow function
// FC é um generic, que é um tipo que pode receber um parametro
// Parametro indica quais propriedades que o componente pode receber
// interface define a tipagem de um objeto
// Note que ele é um objeto {}
// Cada campo tem seu nome e sua tipagem(String, Number,etc)
// Cada campo do objeto pode ser obrigatorio ou nao (campo?: value não é obrigatorio, campo: value é obrigartorio)
// Coloca-se então ele como parametro(ou generic) no FC
// Dentro da function do const, temos o parametro, props, que são as propiedades que estão vindo para ele quando é carregado
interface HeaderProps {
    title: string
}

const Header: React.FC<HeaderProps> = (props) => {
    return (
        <header>
            <h1>{props.title}</h1>
        </header>
    )
}


export default Header;