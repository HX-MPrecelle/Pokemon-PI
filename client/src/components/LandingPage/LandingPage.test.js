import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../store/index';
import { BrowserRouter } from 'react-router-dom';
import LandingPage from './LandingPage';


describe('LandingPage', () => {

    it('Tiene un botón que redirecciona a /home', () => {
      render(<Provider store={store}><BrowserRouter><LandingPage/></BrowserRouter></Provider>);
      const home = screen.getByText(/Let's go!/i);
      expect(home).toBeInTheDocument();
    });
  
    it('Tiene una imagen como logo de Pokémon', () => {
      render(<Provider store={store}><BrowserRouter><LandingPage/></BrowserRouter></Provider>);
      const img = screen.getByRole('img');
      expect(img).toBeInTheDocument();
    })

  });