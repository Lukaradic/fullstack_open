import React, { useState } from 'react'
import * as z from 'zod/mini'
import { Diary } from '../types'

type Props = {
  addNewDiary: (diary: Diary) => void
}

const visibilityOptions = ['great', 'good', 'ok', 'poor']
const weatherOptions = ['sunny', 'rainy', 'cloudy', 'stormy', 'windy']

const formSchema = z.object({
  date: z.string(),
  weather: z.enum(weatherOptions),
  visibility: z.enum(visibilityOptions),
  comment: z.string(),
})

export const DiaryForm = ({ addNewDiary }: Props) => {
  const [formData, setFormData] = useState({
    date: '',
    visibility: '',
    weather: '',
    comment: '',
  })

  const [error, setError] = useState('')

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      const parsedData = formSchema.parse(formData)
      const res = await fetch('http://localhost:3000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedData),
      })

      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(errorText)
      }

      const data = await res.json()
      addNewDiary(data)
      setFormData({
        visibility: '',
        weather: '',
        date: '',
        comment: '',
      })
      setError('')
    } catch (error) {
      if (error instanceof Error) {
        setError(error?.message)
      } else {
        setError('Something went wrong')
      }
    }
  }

  return (
    <>
      {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
      <form
        onSubmit={submitForm}
        style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 400 }}
      >
        <label htmlFor="date">
          date{' '}
          <input
            type="date"
            value={formData.date}
            id="date"
            name="date"
            onChange={handleOnChange}
          />
        </label>
        <label htmlFor="visibility">
          visibility{' '}
          {visibilityOptions.map((option) => (
            <>
              <span>{option}</span>
              <input
                key={option}
                type="radio"
                name="visibility"
                value={option}
                checked={option === formData.visibility}
                onChange={handleOnChange}
              />
            </>
          ))}
        </label>
        <label htmlFor="weather">
          weather{' '}
          {weatherOptions.map((option) => (
            <>
              <span>{option}</span>
              <input
                key={option}
                type="radio"
                name="weather"
                value={option}
                checked={option === formData.weather}
                onChange={handleOnChange}
              />
            </>
          ))}
        </label>
        <label htmlFor="comment">
          comment{' '}
          <input
            type="text"
            id="comment"
            name="comment"
            onChange={handleOnChange}
            value={formData.comment}
          />
        </label>
        <button type="submit">add</button>
      </form>
    </>
  )
}
