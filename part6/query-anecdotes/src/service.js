const baseUrl = 'http://localhost:3001'

export const getAnecdotes = async () => {
  console.log('calling get anecdotes')
  const response = await fetch(`${baseUrl}/anecdotes`)
  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }
  return await response.json()
}

export const createAnecodte = async (content) => {
  const res = await fetch(`${baseUrl}/anecdotes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content, votes: 0 }),
  })

  if (!res.ok) {
    throw new Error('Failed to create anecdote')
  }
  return await res.json()
}

export const voteAnecdote = async (anecdote) => {
  const res = await fetch(`${baseUrl}/anecdotes/${anecdote.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...anecdote, votes: anecdote.votes + 1 }),
  })
  if (!res.ok) {
    throw new Error('Failed to vote anecdote')
  }

  return await res.json()
}
