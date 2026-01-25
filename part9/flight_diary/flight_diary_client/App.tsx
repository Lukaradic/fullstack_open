import { useState } from 'react'
import { Diaries } from './components/Diaries'
import { Diary } from './types'
import { DiaryForm } from './components/DiaryForm'

export const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([])

  const addNewDiary = (diary: Diary) => {
    setDiaries([...diaries, diary])
  }
  return (
    <div>
      <DiaryForm addNewDiary={addNewDiary} />
      <Diaries diaries={diaries} setDiaries={setDiaries} />
    </div>
  )
}
