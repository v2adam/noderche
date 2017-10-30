import React from 'react'
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react'

const ValidationMessages = (props) => (
  <Message error={props.error}
           warning={props.warning}
           success={props.success}
           header={props.header}
           list={props.list}
           content={props.content}/>
);

ValidationMessages.propTypes = {
  success: PropTypes.bool,
  warning: PropTypes.bool,
  error: PropTypes.bool,
  header: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.string),
  content: PropTypes.string
};

ValidationMessages.defaultProps = {
  success: false,
  warning: false,
  error: false
};

export default ValidationMessages;
