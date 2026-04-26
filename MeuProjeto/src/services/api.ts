import axios from 'axios';

// Eu crio essa base para não ter que repetir o endereço completo toda vez
const api = axios.create({
  baseURL: 'https://www.googleapis.com/books/v1/',
});

export default api;