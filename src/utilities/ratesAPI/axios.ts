import axios from 'axios';

export default axios.create({
  baseURL: 'https://klient.internetowykantor.pl/api/public/',
});
