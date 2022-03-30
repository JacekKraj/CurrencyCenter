import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './fireConfig';

import GlobalContexts from './context/globalContexts';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <GlobalContexts>
      <App />
    </GlobalContexts>
  </BrowserRouter>,
  document.getElementById('root')
);
