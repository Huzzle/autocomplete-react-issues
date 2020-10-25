import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import { Badge } from '../../ui-kit/Badge'

import './IssuesList.css'

const renderLabels = (labels) => {
  if (labels && labels.length > 0) {
    return (
      <div className="IssuesList__ItemBadges">
        {labels.map(({ id, name, color }) => (
          <Badge key={id} text={name} color={color} />
        ))}
      </div>
    )
  }

  return null
}

export const IssuesList = ({ issues, highlighted }) => {
  const linkEl = useRef(null)

  useEffect(() => {
    linkEl.current && linkEl.current.focus()
  }, [highlighted])

  function renderIssues () {
    return issues.map(({ id, title, labels, url }, index) => {
      const isHighlighted = index === highlighted

      const classes = cx('IssuesList__Item', {
        'IssuesList__Item--highlighted': isHighlighted
      })
  
      return (
        <a href={url} target="_blank" className={classes} key={id} ref={isHighlighted ? linkEl : null}>
          <div className="IssuesList__ItemTitle">{title}</div>
          {renderLabels(labels)}
        </a>  
      )
    })
  }

  return (
    <div className="IssuesList">
      {renderIssues(issues, highlighted)}
    </div>
  )
}

IssuesList.propTypes = {
  issues: PropTypes.array,
  highlighted: PropTypes.number,
}
