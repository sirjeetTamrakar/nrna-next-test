import { legacy_createStore as createStore, applyMiddleware } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import rootReducer from './rootReducer';

const Store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

export default Store;
