import {
    render,
    screen,
    fireEvent,
    waitFor,
    act,
} from '@testing-library/react'
import '@testing-library/jest-dom'
import {Provider} from 'react-redux'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import TodoList from '../../TodoList'
import {store} from '../../../app/store'

const server = setupServer(
    rest.get('https://api.todoist.com/rest/v1/tasks', (req, res, ctx) => {
        return res(ctx.json([{
            id: 2995104339,
            content: 'Buy Milk'
        }]))
    }),

    rest.get('https://api.todoist.com/sync/v8/completed/get_all', (req, res, ctx) => {
        return res(ctx.json({
            items: [{
                id: 2995104339,
                content: 'Buy Milk'
            }]
        }))
    }),
)

beforeEach(() => render(<Provider store={store}><TodoList/></Provider>))
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

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

        const loading = await screen.findByTestId('loading-2')
        expect(loading).toBeInTheDocument()

        const todoListItem = await screen.findByTestId(`completed-item-0`)
        waitFor(() => expect(todoListItem).toBeInTheDocument())
    })

})
