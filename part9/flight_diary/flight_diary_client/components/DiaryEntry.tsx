import React from 'react'
import type { Diary } from '../types'

type Props = {
  diary: Diary
}

export const DiaryEntry = ({ diary }: Props) => {
  const { date, weather, visibility } = diary
  return (
    <div>
      <p>
        <strong>{date}</strong>
      </p>
      <p>visibility: {visibility}</p>
      <p>weather: {weather}</p>
    </div>
  )
}
