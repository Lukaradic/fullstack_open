import { useContext } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecodte } from '../service'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {
  const client = useQueryClient()

  const context = useContext(NotificationContext)

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    const data = await createAnecodte(content)
    event.target.anecdote.value = ''
    return data
  }
  const mutation = useMutation({
    mutationFn: onCreate,
    onSuccess: (newAnecdote) => {
      context.dispatch({
        type: 'CREATED',
        payload: `anecdote ${newAnecdote.content} voted`,
      })
      client.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: (error) => {
      context.dispatch({
        type: 'ERROR',
        payload: error?.message,
      })
    },
  })

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={mutation.mutate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
