import React, { useState, useEffect } from 'react'
import useConstant from 'use-constant'
import AwesomeDebouncePromise from 'awesome-debounce-promise'

import { searchIssues } from '../../api/gitHub'
import { IssuesList } from '../IssuesList'
import { TextField } from '../../ui-kit/TextField'
import { withSpinner } from '../../hocs/withSpinner'

import './Issues.css'

const TextFieldWithSpinner = withSpinner(TextField)

export const Issues = () => {
  const [queryText, setQueryText] = useState('')
  const [issues, setIssues] = useState([])
  const [loading, setLoading] = useState(false)
  const [highlighted, setHighlighted] = useState(-1)

  const searchIssuesDebounced = useConstant(() =>
    AwesomeDebouncePromise(searchIssues, 500)
  )

  useEffect(() => {
    let ignore = false

    async function fetchIssues() {
      setLoading(true)
      
      const result = await searchIssuesDebounced(queryText)

      if (!ignore) {
        setIssues(result)
      }

      setLoading(false)
      setHighlighted(-1)
    }

    if (queryText.length > 0) {
      fetchIssues()
    } else {
      setIssues([])
      setHighlighted(-1)
    }

    return () => { ignore = true }
  }, [queryText])

  function onKeyDown(event) {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      let nextHighlightedIndex = issues[highlighted + 1] ? highlighted + 1 : 0

      if (event.key === 'ArrowUp') {
        nextHighlightedIndex = issues[highlighted - 1] ? highlighted - 1 : issues.length - 1
      }

      event.preventDefault()
      setHighlighted(nextHighlightedIndex)
    }
  }

  return (
    <div className="Issues" onKeyDown={onKeyDown}>
      <TextFieldWithSpinner
        showSpinner={loading}
        placeholder="Search all React issues"
        value={queryText}
        onChange={(e) => setQueryText(e.target.value)}
      />
      {issues.length > 0 && <IssuesList issues={issues} highlighted={highlighted} />}
    </div>
  )
}
