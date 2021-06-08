import * as authActionTypes from "../actionTypes/authActionTypes";

const initialState = {
  id: undefined,
  email: undefined,
  access: undefined,
  type: undefined,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authActionTypes.AUTH_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
