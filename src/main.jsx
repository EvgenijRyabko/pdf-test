import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { DefaultWrapper } from './components/DefaultWrapper.jsx';
import { MainRouter } from './router/Router.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DefaultWrapper>
      <MainRouter />
    </DefaultWrapper>
  </StrictMode>,
);
