import { ADD_TASK } from "../actions/actions";

const initialState = {
  product: [] as string[],
};

function rootReducer(state = initialState, action: { type: string; payload: any }) {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        product: [...state.product, action.payload],
      };
    default:
      return state;
  }
}

export default rootReducer;
