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

  // create a handleRemove event to remove specific row in the list
  // filter through the list and find the correct index number associated to the row
  // a delete button should be in each list item/row

  return (
    <div>
      <h1>Habit List</h1>
      <input type="text" value={input} onChange={handleInput} />
      <button onClick={handleAdd}>Add!</button>

      <ul>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default HabitList
