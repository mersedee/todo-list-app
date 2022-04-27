import {
    render,
    screen,
    fireEvent,
    waitFor,
} from '@testing-library/react'
import '@testing-library/jest-dom'
import {Provider} from 'react-redux'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import TodoItem from '../../TodoItem'
import {store} from '../../../../app/store'

beforeEach(() => render(
    <Provider store={store}>
        <TodoItem task={{id: 1, content: 'sample', priority: 1}}/>
    </Provider>
))

describe('TodoItem', () => {

    it("should checked checkbox on click label", () => {
        const label = screen.getByTestId("task-label")
        fireEvent.click(label)
        const checkbox = screen.getByTestId("checkbox")
        expect(checkbox).toBeChecked()
    })

    it("should open modal", async () => {
        const element = screen.getByTestId("modal-trigger")
        fireEvent.click(element)
        const title = screen.queryByText("Edit Task")
        expect(title).toBeInTheDocument()
    })

    it("should edit task", async () => {
        const element = screen.getByTestId("modal-trigger")
        fireEvent.click(element)
        const button = screen.getByRole('button', {name: 'Submit'})
        fireEvent.click(button)
        const title = screen.queryByText("Edit Task")
        await waitFor(() => expect(title).toBeNull())
    })
})