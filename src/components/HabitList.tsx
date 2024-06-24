import { useState } from 'react'

const HabitList = () => {
  const [list, setList] = useState<string[]>([])
  const [input, setInput] = useState<string>('')

  const handleAdd = () => {
    if (input.trim()) {
      setList([...list, input])
      setInput('')
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  return (
    <div>
      <h1>Habit List</h1>
      <input type="text" value={input} onChange={handleInput} />
      <button onClick={handleAdd}>Add!</button>

      <ul>
        <li>Habit 1</li>
        <li>Habit 2</li>
        <li>Habit 3</li>
      </ul>
    </div>
  )
}

export default HabitList
