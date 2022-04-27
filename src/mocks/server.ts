import {setupServer} from 'msw/node'
import handlres from './handlers'

const server = setupServer(...handlres);

export default server;