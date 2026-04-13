import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';
import { MemoryRouter } from 'react-router-dom';

describe('Home Page', () => { 
    it('should display the correct title', () => {
        const {getByTestId} = render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        );
        const welcomeMsg = getByTestId('home-title').textContent;
        expect(welcomeMsg).toBe('Bienvenido');
    });
 });