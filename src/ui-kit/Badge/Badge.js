import React from 'react'
import PropTypes from 'prop-types'

import './Badge.css'

export const Badge = ({ text, color }) => {
  const style = {
    backgroundColor: color
  }

  return (
    <div className="Badge" style={style}>{text}</div>
  )
}

Badge.propTypes = {
  text: PropTypes.node.isRequired,
  color: PropTypes.string,
}
