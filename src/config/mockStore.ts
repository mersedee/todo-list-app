import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const initialState = {tasks: {}};
const middlewares = [thunk];
const configStore = configureStore(middlewares); 
const mockStore = configStore(initialState);

export default mockStore;