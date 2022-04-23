import {
    render,
    screen,
    fireEvent,
    waitFor,
    act,
} from '@testing-library/react';
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AddInput from '../../AddInput';

const initialState = {tasks: {}};
const middlewares = [thunk];
const configStore = configureStore(middlewares);
let mockStore = configStore(initialState);

beforeEach(() => {
    render(<Provider store={mockStore}><AddInput/></Provider>);
});

describe('AddInput', () => {

    it('should render input', () => {
        const inputElement = screen.getByPlaceholderText(/Add New Task/i);
        expect(inputElement).toBeInTheDocument();
    });

    it('should type in input', () => {
        const inputElement = screen.getByPlaceholderText(/Add New Task/i);
        fireEvent.click(inputElement);
        fireEvent.change(inputElement, {target: {value: 'buy tea'}});
        expect((inputElement as HTMLInputElement).value).toBe('buy tea');
    })

    it('should empty input when add button is clicked', async () => {
        const inputElement = screen.getByPlaceholderText(/Add New Task/i);
        fireEvent.change(inputElement, {target: {value: 'buy tea'}});
        const submitElement = screen.getByRole("button");
        fireEvent.click(submitElement);
        waitFor(() => expect((inputElement as HTMLInputElement).value).toBe(''));
    })
})