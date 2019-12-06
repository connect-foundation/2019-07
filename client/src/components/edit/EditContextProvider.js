import React, { useReducer, createContext } from 'react';
import PropTypes from 'prop-types';
import {
  initialQuizsetState,
  quizsetReducer,
  actionTypes,
} from '../../reducer/hostEditReducer';

export const EditContext = createContext();

function EditContextProvider({ children }) {
  const [quizsetState, dispatch] = useReducer(
    quizsetReducer,
    initialQuizsetState,
  );
  return (
    <EditContext.Provider value={{ quizsetState, dispatch, actionTypes }}>
      {children}
    </EditContext.Provider>
  );
}

EditContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default EditContextProvider;
