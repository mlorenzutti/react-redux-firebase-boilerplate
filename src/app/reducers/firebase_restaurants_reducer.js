import {
  FETCH_RESTAURANTS,
  FETCH_RESTAURANT,
} from '../actions/types';

const INITIAL_STATE = { all:[], restaurant: null };

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
    case FETCH_RESTAURANTS:
    return {
              ...state, all: action.payload.value
           };
    case FETCH_RESTAURANT:
    console.log(action.payload);
    return {
              ...state, restaurant: action.payload.value
           };
    default:
        return state;
    }
}
