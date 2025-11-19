import { act, createContext, useReducer, useRef } from 'react'

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATED':
      return `Anecdote '${action.payload}' created`
    case 'VOTED':
      return `Anecdote '${action.payload}' voted`
    case 'ERROR':
      return action.payload
    case 'CLEAR':
      return null
    default:
      return state
  }
}
const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(reducer, null)

  const timeoutRef = useRef(null)

  const dispatch = (action) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    notificationDispatch(action)
    if (action.type !== 'CLEAR') {
      timeoutRef.current = setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 5000)
    }
  }

  return (
    <NotificationContext.Provider value={{ notification, dispatch }}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
