import * as ActionTypes from './ActionTypes';

export const comentarios = (state = { errMess: null, comentarios: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMENTARIOS:
      return {...state, errMess: null, comentarios: action.payload};

    case ActionTypes.COMENTARIOS_FAILED:
      return {...state, errMess: action.payload};

    case ActionTypes.ADD_COMENTARIO:
      var comentario = action.payload;
      comentario.id = state.comentarios.length;
      return {...state, errMess: null, comentarios: state.comentarios.concat(comentario)};

    default:
      return state;
  }
};