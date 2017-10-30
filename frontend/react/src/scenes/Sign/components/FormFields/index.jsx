import React from 'react'
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react'

const FormField = (props) => (
  <Form.Field>
    <label>{props.label}</label>
    <input placeholder={props.placeholder}
           type={props.fieldType}
           required={props.isRequired}
           value={props.value}
           onChange={props.handleChange}
           name={props.name}/>
  </Form.Field>
);

// megmondod, hogy mi a típusa + kötelező-e
FormField.propTypes = {
  label: PropTypes.string,
  fieldType: PropTypes.string.isRequired,
  isRequired: PropTypes.bool.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

// default értékek
FormField.defaultProps = {
  label: 'Default label',
  placeholder: 'Default placeholder',
  isRequired: false,
};


export default FormField;
