import {
    render,
    screen,
    fireEvent,
    waitFor,
} from '@testing-library/react'
import '@testing-library/jest-dom'
import {Provider} from 'react-redux'
import TodoList from '../../TodoList'
import {store} from '../../../app/store'

beforeEach(() => render(<Provider store={store}><TodoList/></Provider>))

describe('TodoList', () => {

    it("activates second tab when clicking on it", () => {
        const tab1 = screen.getByText(/All/i)
        const tab2 = screen.getByText(/Completed/i)
        expect(tab1).toHaveAttribute("aria-selected", "true")
        expect(tab2).toHaveAttribute("aria-selected", "false")

        fireEvent.click(tab2);

        expect(tab1).toHaveAttribute("aria-selected", "false")
        expect(tab2).toHaveAttribute("aria-selected", "true")
    });


    it('should render todo list', async () => {
        const loading = screen.getByTestId('loading-1')
        expect(loading).toBeInTheDocument()

        const todoListItem = await screen.findAllByTestId(`todo-item-0`)
        waitFor(() => expect(todoListItem).toBeInTheDocument())
    })

    it('should render completed todo list', async () => {
        const tab2 = screen.getByText(/Completed/i)
        fireEvent.click(tab2);

        const loading = screen.getByTestId('loading-2')
        expect(loading).toBeInTheDocument()

        const todoListItem = await screen.findByTestId(`completed-item-0`)
        waitFor(() => expect(todoListItem).toBeInTheDocument())
    })

})
