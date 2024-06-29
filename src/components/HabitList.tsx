import { useEffect, useState } from 'react'

const HabitList = () => {
  const [list, setList] = useState<string[]>([])
  const [input, setInput] = useState<string>('')
  const [editIndex, setEditIndex] = useState(null)

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem('list') || '[]')
    if (savedList) {
      setList(savedList)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  const handleAdd = () => {
    if (input.trim()) {
      if (editIndex !== null) {
        const newList = list.map((item, index) =>
          index === editIndex ? input : item
        )
        setList(newList)
        setEditIndex(null)
      } else {
        setList([...list, input])
      }
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

  const handleEdit = (index) => {
    setInput(list[index])
    setEditIndex(index)
  }

  return (
    <div>
      <h1>Habit List</h1>
      <input type="text" value={input} onChange={handleInput} />
      <button onClick={handleAdd}>Add!</button>

      <ul>
        {list.map((item, index) => (
          <li key={index}>
            {item} <button onClick={() => handleDelete(index)}>Delete!</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HabitList
