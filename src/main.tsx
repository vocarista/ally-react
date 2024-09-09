import App from './App.tsx'
import './index.css'
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';

ReactDOM.render(
  <BrowserRouter>
    <App />
    <Toaster />
  </BrowserRouter>,
  document.getElementById('root')
);