// voteAnecdote

import React, { useContext } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { voteAnecdote } from '../service'

import NotificationContext from '../NotificationContext'

export const AnecdoteList = ({ anecdotes }) => {
  const client = useQueryClient()

  const context = useContext(NotificationContext)

  const mutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (newAnecdote) => {
      context.dispatch({
        type: 'VOTED',
        payload: `anecdote ${newAnecdote.content} voted`,
      })

      client.setQueriesData(['anecdotes'], (oldAnecdotes) => {
        return oldAnecdotes.map((anecdote) =>
          anecdote.id === newAnecdote.id ? { ...newAnecdote } : anecdote,
        )
      })
    },
  })

  return anecdotes.map((anecdote) => (
    <div
      key={anecdote.id}
      style={{
        marginBottom: 12,
        marginTop: 12,
        padding: 8,
        border: '1px solid black',
      }}
    >
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => mutation.mutate(anecdote)}>vote</button>
      </div>
    </div>
  ))
}
