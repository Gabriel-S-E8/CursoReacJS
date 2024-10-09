import axios from 'axios';

// Substitua 'seu_token_aqui' pelo seu token de acesso pessoal
const api = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
        'Authorization': `Colocar o token aqui`,
        'Accept': 'application/vnd.github.v3+json'
    }
});

export default api;
