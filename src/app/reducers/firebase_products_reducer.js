import {
  CREATE_PRODUCT,
} from '../actions/types';


export default function (state = null, action) {
    switch (action.type) {
    case CREATE_PRODUCT:
        return action.payload;
    default:
        return state;
    }
}
