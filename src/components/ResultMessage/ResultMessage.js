import React from 'react';
import PropTypes from 'prop-types';

import './ResultMessage.css';

function ResultMessage(props) {
  return (
    <div className="result-message">
      {props.result.result ? <p>Congratulations, {props.result.guess} is correct!</p> : <p>Sorry, {props.result.guess} is incorrect. The correct answer is {props.answerFlag.name}.</p>}
    </div>
  );
}

ResultMessage.propTypes = {
  result: PropTypes.object.isRequired,
  answerFlag: PropTypes.object.isRequired,
};

export default ResultMessage;