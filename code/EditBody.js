import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SideBar from './SideBar';
import Template from './Template';

function EditBody({ quizSet, setQuizSet }) {
  const [quizFocusedIndex, setQuizFocusedIndex] = useState(0);
  return (
    <>
      <SideBar
        quizSet={quizSet}
        setQuizSet={setQuizSet}
        setQuizFocusedIndex={setQuizFocusedIndex}
      />
      <Template
        quiz={quizSet[quizFocusedIndex]}
        quizIndex={quizFocusedIndex}
        quizSet={quizSet}
        setQuizSet={setQuizSet}
      />
    </>
  );
}

EditBody.propTypes = {
  quizSet: PropTypes.arrayOf(Object).isRequired,
  setQuizSet: PropTypes.func.isRequired,
};

export default EditBody;
