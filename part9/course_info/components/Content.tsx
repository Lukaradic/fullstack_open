import React from 'react'
import { CoursePart } from '../types'
import { Part } from './Part'

type Props = {
  courseParts: CoursePart[]
}
export const Content = ({ courseParts }: Props) => {
  return (
    <>
      {courseParts.map((part, i) => (
        <Part part={part} key={i} />
      ))}
    </>
  )
}
