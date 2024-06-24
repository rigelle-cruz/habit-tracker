import { useState } from 'react'

const HabitList = () => {
  const [list, setList] = useState([])
  const [input, setInput] = useState('')

  const handleAdd = () => {
    if (input.trim()) {
      setList([...list, input])
      setInput('')
    }
  }

  return (
    <div>
      <h1>Habit List</h1>
      <ul>
        <button onClick={handleAdd}>Add!</button>
        <li>Habit 1</li>
        <li>Habit 2</li>
        <li>Habit 3</li>
      </ul>
    </div>
  )
}

export default HabitList
