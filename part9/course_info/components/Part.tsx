import React from 'react'
import { CoursePart } from '../types'

type Props = {
  part: CoursePart
}

export const Part = ({ part }: Props) => {
  const { description, name, exerciseCount } = part
  switch (part.kind) {
    case 'group':
      return (
        <div>
          <p>
            <strong>
              {name} {exerciseCount}
            </strong>
          </p>
          <p>project exercises {part.groupProjectCount}</p>
        </div>
      )
    case 'background':
      return (
        <div>
          <p>
            <strong>
              {name} {exerciseCount}
            </strong>
          </p>
          <p>
            <i>{description}</i>
          </p>
          <p>submit to: {part.backgroundMaterial}</p>
        </div>
      )

    case 'special':
      return (
        <div>
          <p>
            <strong>
              {name} {exerciseCount}
            </strong>
          </p>
          <p>
            <i>{description}</i>
          </p>
          <p>
            required skills:{' '}
            {part.requirements.map((requirement) => (
              <span>{requirement}</span>
            ))}
          </p>
        </div>
      )
    default:
      return (
        <div>
          <p>
            <strong>
              {name} {exerciseCount}
            </strong>
          </p>
          <p>
            <i>{description}</i>
          </p>
        </div>
      )
  }
}
