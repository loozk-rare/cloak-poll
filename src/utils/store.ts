import { useReducer } from "react";
import { createContainer } from "react-tracked";

export const actions = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  SET_REDIRECT: "SET_REDIRECT",
};

type State = {
  isLoggedIn: boolean;
  user: any;
};
export const initialState: State = {
  isLoggedIn: false,
  user: null,
};

export const { Provider: SharedStateProvider, useTracked: useSharedState } =
  createContainer(() => useReducer(reducer, initialState));

type action = {
  type: string;
  payload?: any;
};

export const reducer = (state: State, action: action): State => {
  switch (action.type) {
    default:
      return state;
  }
};
