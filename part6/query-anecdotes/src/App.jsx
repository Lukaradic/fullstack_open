import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { AnecdoteList } from './components/AnecdoteList'
import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from './service'

const App = () => {
  const {
    data: anecdotes,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
  })

  const showAnecdotes = !isLoading && Array.isArray(anecdotes)

  if (isError) {
    return <div>anecdote service not available due to server problems</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {showAnecdotes && <AnecdoteList anecdotes={anecdotes} />}
    </div>
  )
}

export default App
