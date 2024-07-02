import { useEffect, useState } from 'react'

const HabitList = () => {
  const [list, setList] = useState<string[]>([])
  const [input, setInput] = useState<string>('')
  const [editIndex, setEditIndex] = useState<number | null>(null)

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

  const handleEdit = (index: number) => {
    setInput(list[index])
    setEditIndex(index)
  }

  return (
    <div className="habit-container">
      <div className="input-group">
        <input
          type="text"
          value={input}
          onChange={handleInput}
          placeholder="Enter a new habit"
        />
        <button onClick={handleAdd}>
          {editIndex !== null ? 'Update' : 'Add'}
        </button>
      </div>
      <ul className="habit-list">
        {list.map((item, index) => (
          <li key={index} className="habit-item">
            {item} <button onClick={() => handleEdit(index)}>Edit!</button>
            <button onClick={() => handleDelete(index)}>Delete!</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HabitList
