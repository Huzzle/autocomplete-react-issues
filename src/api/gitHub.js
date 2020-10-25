const gitHubSearchUrl = 'https://api.github.com/search'
const perPage = 10

export const searchIssues = async (text) => {
  const searchText = (text || '')
    .split(' ')
    .filter(t => t.length)
    .join('+')

  const url = `${gitHubSearchUrl}/issues?q=${searchText}+repo:facebook/react+type:issue&per_page=${perPage}`

  const options = {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    }
  }

  const response = await fetch(url, options)

  if (response.status !== 200) {
    throw new Error(`${response.status} - ${response.statusText}`)
  }

  const { items } = await response.json()

  return items.map(({ id, html_url, title, labels, state }) => ({
    url: html_url,
    labels: labels.map(({ id, name, color }) => ({ id, name, color: `#${color}` })),
    id,
    title,    
    state,
  }))
}
