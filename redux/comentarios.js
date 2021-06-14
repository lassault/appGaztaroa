import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../comun/comun';

export const comentarios = (state = { errMess: null, comentarios: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMENTARIOS:
      return {...state, errMess: null, comentarios: action.payload};

    case ActionTypes.COMENTARIOS_FAILED:
      return {...state, errMess: action.payload};

    case ActionTypes.ADD_COMENTARIO:
      action.payload.id = state.comentarios.length;
      state.comentarios.push(action.payload);
      fetch(baseUrl + 'comentarios/' + action.payload.id + '.json', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(action.payload)
      })
      return {...state, errMess: null, comentarios: state.comentarios};

    default:
      return state;
  }
};