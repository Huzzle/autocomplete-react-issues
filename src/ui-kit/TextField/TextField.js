import React from 'react'
import PropTypes from 'prop-types'

import './TextField.css'

export const TextField = ({ placeholder, value, onChange }) => (
  <input
    className="TextField"
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
)

TextField.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
}
