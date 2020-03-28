import React from 'react';
import PropTypes from 'prop-types';

import './PlayAgainButton.css';

function PlayAgainButton(props) {
  return (
    <button className="play-again-button" type="button" onClick={props.onClick}>Play Again?</button>
  );
}

PlayAgainButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default PlayAgainButton;