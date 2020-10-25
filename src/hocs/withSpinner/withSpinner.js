import React from 'react'

import { Spinner } from '../../ui-kit/Spinner'

import './withSpinner.css'

export const withSpinner = (WrappedComponent) => {
  return ({ showSpinner, ...props }) => (
    <div className="withSpinner">
      <WrappedComponent {...props} />
      {showSpinner && <Spinner />}
    </div>
  )
}
