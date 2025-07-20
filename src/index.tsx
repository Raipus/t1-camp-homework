import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { FontsVTBGroup, DropdownProvider } from '@admiral-ds/react-ui';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from '@app/App';
import './index.css';
import './normalize.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <DropdownProvider>
        <FontsVTBGroup />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DropdownProvider>
    </Provider>
  </StrictMode>,
);
