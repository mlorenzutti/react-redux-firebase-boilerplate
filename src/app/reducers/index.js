import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import FireBaseUserReducer from './firebase_user_reducer';
import FireBaseRestaurantsReducer from './firebase_restaurants_reducer';
import FireBaseProductsReducer from './firebase_products_reducer';

const rootReducer = combineReducers({
    currentUser: FireBaseUserReducer,
    restaurants: FireBaseRestaurantsReducer,
    products: FireBaseProductsReducer,
    form: formReducer,
});

export default rootReducer;
