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
import TodoList from '../../TodoItem'
import {store} from '../../../../app/store'


describe('TodoItem', () => {

    it("activates second tab when clicking on it", () => {

    })
})