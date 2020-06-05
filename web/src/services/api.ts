import axios from 'axios';

// Aqui vem o pulo do gato
// Não estamos usando o .fetch da propria navegação do browser
// Pois no axios podemso definir uma baseURL
const api = axios.create({
    baseURL: 'http://localhost:3333'
});

export default api;