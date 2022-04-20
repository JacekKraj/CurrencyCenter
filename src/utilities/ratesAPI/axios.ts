import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://klient.internetowykantor.pl/api/public/',
});

export default instance;
