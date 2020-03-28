import React from 'react';
import PropTypes from 'prop-types';

import './ResultMessage.css';

function ResultMessage(props) {
  return (
    <React.Fragment>
      {props.result ? <p>Congratulations!</p> : <p>Sorry</p>}
    </React.Fragment>
  );
}

ResultMessage.propTypes = {
  result: PropTypes.bool.isRequired,
};

export default ResultMessage;