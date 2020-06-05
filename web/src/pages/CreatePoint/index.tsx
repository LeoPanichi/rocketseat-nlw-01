import React, {useEffect, useState, ChangeEvent, FormEvent} from 'react';

import {Link, useHistory} from 'react-router-dom';

import {FiArrowLeft} from 'react-icons/fi';

import {Map, TileLayer, Marker, Popup} from 'react-leaflet';

import {LeafletMouseEvent} from 'leaflet';

import api from '../../services/api';

import './styles.css';

import logo from '../../assets/logo.svg';

import Axios from 'axios';

import Dropzone from '../../components/Dropzone';

// Não é bom definir a api nem fora da função
// E dentro, é complicado pois se algo mudar, tudo é recarregado, pelo conceito de estado, e a chamada seria feita de novo sempr eque houvesse alteração
// Vamos usar um componente do React chamado, useEffect
// Nele passa-se 2 parametros: a função a executar, e quando executar
// Caso o segundo parametros esteja vazio, executará apenas UMA vez o primeiro parametro, independente de quantas vezes a pagina recarregue

// Nota: usaremos a Promise do axios com .then no lugar de async/await, pois o useEffect não permite

// Como não é possivel usar a informação do response (que são os items) fora da função useEffect
// Criaremos um State(estado) para lidar com isso

// SEMPRE que criamos um estado para um array ou objeto, precisamos informar o tipo de variaveis que neles contem
// Com essa definição, podemos definir como o parametro de tipagem do useState
// Como useState<Array<Item>> ou como abaixo

// Podemos também criar uma interface apenas com os campos que queremos
// E se não usarmos a api, e só o axios, é possivel passar pra ele o tipo de retorno no metodo get<Type>

interface Item {
    id: number,
    title: string,
    image_url: string
}

interface IBGEUFResponse {
    sigla: string
}

interface IBGECidadeResponse {
    nome: string
}


const CreatePoint = () => {
    const [items, setItems] = useState<Item[]>([]);

    //const [ufs, setUFs] = useState([""]);
    const [ufs, setUFs] = useState<string[]>([]);

    // Criar um estado para a UF selecionada
    const [selectedUF, setSelectedUF] = useState("0");

    const [cities, setCities] = useState<string[]>([]);

    const [selectedCity, setSelectedCity] = useState("0");

    // Armazenar estado da latitude e longitude no mapa
    // Como a posição é um array, declaramos como um array de numberos
    const [selectedPosition, setSelectedPosition] = useState<[number,number]>([0,0]);

    // Estado para iniciar a geolocalização de quem acessa a pagina
    const [initialPosition, setInitialPosition] = useState<[number,number]>([0,0]);

    // Criar estado para valores dos itens selecionados
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    // Armazenar a fila vinda do Dropzone
    const [selectedFile, setSelectedFile] = useState<File>();
    // Vamos criar um metodo na propria tag do Dropzone

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        wpp: ''
    });

    // Utilizar a navegação sem precisar de um botao
    const history = useHistory();

    useEffect(()=> {
        api.get('/items').then(response => {
            setItems(response.data);
        })
    },
    []);

    useEffect(()=> {
        Axios.get<IBGEUFResponse[]>("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(response => {
            const ufInitials = response.data.map((uf) => uf.sigla);
            setUFs(ufInitials);
        })
    },    
    []);

    useEffect(()=> {
    // Atualizar as cidades/municipios sempre que for alterado a UF
        if (selectedUF === '0'){
            return;
        }
        Axios.get<IBGECidadeResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`)
        .then(response => {
            const cityNames = response.data.map((city) => city.nome);
            setCities(cityNames);
        })
    },
    // Indicar que muda para que precise recarregar
    [selectedUF]);

    useEffect(()=> {
        navigator.geolocation.getCurrentPosition(position => {
            const {latitude, longitude} = position.coords;

            setInitialPosition([latitude,longitude]);
        })
    },
    []);

    // onChange do select recebe de parametro um evento
    // ChangeEvent é o evento de mudança de valor
    // Tipo do ChangeEvent é HTMLSelectElement
    function handleSelectedUF(event: ChangeEvent<HTMLSelectElement>) {
        setSelectedUF(event.target.value);
        // colocar no value do select o valor de selectedUF
        // Sempre que houver mudança no valor do option, o select vai ter o valor atualizado
    }

    function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>) {
        setSelectedCity(event.target.value);
        // colocar no value do select o valor de selectedUF
        // Sempre que houver mudança no valor do option, o select vai ter o valor atualizado
    }

    // Função para lidar com o click no mapa
    function handleMapClick(event: LeafletMouseEvent){
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng
        ]);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const {name, value} = event.target;
        // Caso fosse utilizado o setFormData para cada campo separadamente
        // Ele sobreescreveria o valor dos outros com '', pq é o formato dele ali no useState
        // Usamos o SPREAD operator para armazenar o que já há no FormData e adicionar/modificar com o que esta vindo do evento
        // Uso do colchete para informar uma variavel como nome do campo
        setFormData({...formData, [name]: value});
    }

    function handleSelectedItem(id: number){
        // Quando precisa enviar um parametro para função
        // Nesse caso, na tag li, usa-se uma arrow function e chama a essa função com parametro
        //const alreadySelected = selectedItems.includes(id);
        const alreadySelected = selectedItems.findIndex(index => index === id);

        if (alreadySelected >= 0){
            const fileteredItems = selectedItems.filter(item => item !== id);

            setSelectedItems(fileteredItems);
        } else {
            setSelectedItems([...selectedItems, id]);
        }        
    }

    // IT'S TIME! Finalmente, faremos a função para enviar as informações para API
    async function handleSubmit(event: FormEvent){
        // Com esse evento, podemos previnir o formulário de se recarregar sempre que enviado
        event.preventDefault();

        const {name, email, wpp} = formData;
        const uf = selectedUF;
        const city = selectedCity;
        const [latitude, longitude] = selectedPosition;
        const items = selectedItems;

        // Como estamos usando agora MultiPart FormData Data na API, precisamos mudar este formato e adicionar o suporte a imagem
        // const data = {
        //     name,
        //     email,
        //     whatsapp: wpp,
        //     uf,
        //     city,
        //     latitude,
        //     longitude,
        //     items
        // };

        const data = new FormData();

        data.append('name', name);
        data.append('email', email);
        data.append('whatsapp', wpp);
        data.append('uf', uf);
        data.append('city', city);
        data.append('latitude', String(latitude));
        data.append('longitude', String(longitude));
        data.append('items', items.join(','));

        if (selectedFile){
            data.append('image', selectedFile);
        }
        

        await api.post("/points", data);

        alert('Ponto de Coleta criado');

        history.push('/');
    }

    return (
        <div id="page-create-point">
            <div className="content">
                <header>
                    <img src={logo} alt="Ecoleta"/>
                    <Link to="/">
                        <FiArrowLeft />
                        Voltar para Home
                    </Link>
                </header>

                <form onSubmit={handleSubmit}>
                    <h1>Cadastro do <br /> Ponto de Coleta</h1>

                    <Dropzone onUploadedFile={setSelectedFile}/>

                    <fieldset>
                        <legend>
                            <h2>Dados</h2>
                        </legend>

                        <div className="field">
                            <label htmlFor="" id="name">Nome da Entidade</label>

                            <input 
                                type="text" 
                                name="name"
                                id="name"
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="field-group">
                            <div className="field">
                                <label htmlFor="email">E-Mail</label>

                                <input 
                                    type="email" 
                                    name="email"
                                    id="email"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="field">
                                <label htmlFor="wpp">WhatsApp</label>

                                <input 
                                    type="text" 
                                    name="wpp"
                                    id="wpp"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>
                            <h2>Endereço</h2>

                            <span>Selecione o endereço no mapa</span>
                        </legend>

                        <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution="&amp;copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                            />
                            <Marker position={selectedPosition}>
                                <Popup>Está aqui.</Popup>
                            </Marker>
                        </Map>

                        <div className="field-group">
                            <div className="field">
                                <label htmlFor="uf">Estado</label>

                                <select  
                                    name="uf"
                                    id="uf"
                                    onChange={handleSelectedUF}
                                    value={selectedUF}
                                >
                                    <option key="0" value="0">Selecione uma UF</option>
                                    {
                                        ufs.map((uf) => {
                                            return (
                                                <option key={uf} value={uf}>{uf}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="field">
                                <label htmlFor="city">Cidade</label>

                                <select  
                                    name="city"
                                    id="city"
                                    onChange={handleSelectedCity}
                                    value={selectedCity}
                                >
                                    <option key="0" value="0">Selecione uma Cidade</option>
                                    {
                                        cities.map(city => {
                                            return (
                                                <option key={city} value={city}>{city}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>
                            <h2>Ítens de Coleta</h2>

                            <span>Selecione um ou mais itens abaixo</span>
                        </legend>

                        <ul className="items-grid">
                            {/* <li>
                                <img
                                alt= "Lâmpadas"
                                src= 'http://localhost:3333/uploads/lampadas.svg'
                                />
                                <span>Lâmpadas</span>
                            </li>
                            <li>
                                <img
                                alt= "Pilhas e Baterias"
                                src= 'http://localhost:3333/uploads/baterias.svg'
                                />
                                <span>Pilhas e Baterias</span>
                            </li>
                            <li>
                                <img
                                alt= "Papéis e Papelão"
                                src= 'http://localhost:3333/uploads/papeis-papelao.svg'
                                />
                                <span>Papéis e Papelão</span>
                            </li>
                            <li>
                                <img
                                alt= "Resíduos Eletrônicos"
                                src= 'http://localhost:3333/uploads/eletronicos.svg'
                                />
                                <span>Resíduos Eletrônicos</span>
                            </li>
                            <li>
                                <img 
                                alt= "Resíduos Orgânicos"
                                src= 'http://localhost:3333/uploads/organicos.svg'
                                />
                                <span>Resíduos Orgânicos</span>
                            </li>
                            <li>
                                <img
                                alt= "Òleo de Cozinha"
                                src= 'http://localhost:3333/uploads/oleo.svg'
                                />
                                <span>Òleo de Cozinha</span>
                            </li> */}
                            {
                                items.map((item) => {
                                    return (
                                        <li 
                                            key={item.id} 
                                            onClick={() => handleSelectedItem(item.id)}
                                            className={selectedItems.includes(item.id) ? 'selected' : ''}
                                            >
                                            <img src={item.image_url} alt={item.title} />
                                            <span>{item.title}</span>
                                        </li>
                                    );
                                })
                            }
                            
                        </ul>
                    </fieldset>

                    <button type="submit">
                        Cadastrar Ponto de Coleta
                    </button>
                </form>

            </div>
        </div>
    );
}

export default CreatePoint;