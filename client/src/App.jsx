import { BrowserRouter } from 'react-router-dom';
import { WebRouter, AdminRouter } from './router';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <WebRouter />
      <AdminRouter />
    </BrowserRouter>
  );
}
