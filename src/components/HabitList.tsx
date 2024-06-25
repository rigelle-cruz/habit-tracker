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

  const handleDelete = (index: number) => {
    const newList = list.filter((_, i) => i !== index)
    setList(newList)
  }

  return (
    <div>
      <h1>Habit List</h1>
      <input type="text" value={input} onChange={handleInput} />
      <button onClick={handleAdd}>Add!</button>

      <ul>
        {list.map((item, index) => (
          <li key={index}>
            {item} <button onClick={() => handleDelete}>Delete!</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HabitList
