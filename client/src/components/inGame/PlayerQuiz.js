import React, { useState } from 'react';
import PropTypes from 'prop-types';

import * as colors from '../../constants/colors';
import { Button } from '../common/Buttons';
import * as layout from './Layout';

function Waiting({ index }) {
  return (
    <div>
      waiting
      <div>you choosed : {index}</div>
    </div>
  );
}

function Quiz({ quizSet, quizIndex, setChoose, choose }) {
  const [choosed, setChoosed] = useState(false);

  const currentQuiz = quizSet[quizIndex];
  function chooseAnswer(index) {
    setChoose(index);
    setChoosed(true);
    console.log('choose', index);
  }

  return (
    <layout.Background>
      <layout.TitleContainer>
        <layout.Title>{currentQuiz.title}</layout.Title>
      </layout.TitleContainer>
      {!choosed && (
        <>
          <layout.Center>
            <layout.CenterContentContainer>
              <layout.CenterLeftPanel />
              <layout.ImagePanel />
              <layout.CenterRightPanel />
            </layout.CenterContentContainer>
          </layout.Center>
          <layout.Bottom>
            <layout.ItemContainer>
              {currentQuiz.items.map((item, index) => (
                <layout.Item key={item.title}>
                  <Button
                    backgroundColor={colors.ITEM_COLOR[index]}
                    fontColor={colors.TEXT_WHITE}
                    onClick={e => chooseAnswer(index, e)}
                  >
                    {item.title}
                  </Button>
                </layout.Item>
              ))}
            </layout.ItemContainer>
          </layout.Bottom>
        </>
      )}
      {choosed && <Waiting index={choose} />}
    </layout.Background>
  );
}

Quiz.propTypes = {
  quizSet: PropTypes.shape({
    items: PropTypes.shape({
      title: PropTypes.string,
    }),
    title: PropTypes.string.isRequired,
  }).isRequired,
  quizIndex: PropTypes.number.isRequired,
  setChoose: PropTypes.func.isRequired,
  choose: PropTypes.number.isRequired,
};

export default Quiz;
