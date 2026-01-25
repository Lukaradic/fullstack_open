import React, { useCallback, useEffect } from 'react'
import { Diary } from '../types'
import { DiaryEntry } from './DiaryEntry'

type Props = {
  setDiaries: (data: Diary[]) => void
  diaries: Diary[]
}
export const Diaries = ({ setDiaries, diaries }: Props) => {
  const get = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:3000')
      if (!res?.ok) {
        throw new Error('Failed to fetch diaries')
      }

      const data = await res.json()
      if (Array.isArray(data) && data?.length > 0) {
        setDiaries(data)
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message)
      }
    }
  }, [setDiaries])

  useEffect(() => {
    get()
  }, [get])

  return (
    <div>
      <h1>Diary entries</h1>
      {diaries?.length === 0 && <p>No diary entries</p>}
      {diaries.map((entry) => (
        <DiaryEntry diary={entry} key={entry.id} />
      ))}
    </div>
  )
}
