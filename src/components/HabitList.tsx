import { useEffect, useState } from 'react'

const HabitList = () => {
  const [list, setList] = useState<string[]>([])
  const [input, setInput] = useState<string>('')
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [editingValue, setEditingValue] = useState<string>('')

  useEffect(() => {
    const savedList = localStorage.getItem('list')
    if (savedList) {
      setList(JSON.parse(savedList))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  const handleAdd = () => {
    if (input.trim()) {
      setList([...list, input])
      setInput('')
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAdd()
    }
  }

  const handleDelete = (index: number) => {
    const newList = list.filter((_, i) => i !== index)
    setList(newList)
  }

  const handleEdit = (index: number) => {
    setEditIndex(index)
    setEditingValue(list[index])
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingValue(e.target.value)
  }

  const handleEditSubmit = (index: number) => {
    const newList = list.map((item, i) => (i === index ? editingValue : item))
    setList(newList)
    setEditIndex(null)
  }

  return (
    <div className="habit-container">
      <div className="input-group">
        <input
          type="text"
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Enter a new habit"
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      <ul className="habit-list">
        {list.map((item, index) => (
          <li key={index} className="habit-item">
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editingValue}
                  onChange={handleEditChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleEditSubmit(index)
                  }}
                />
                <button onClick={() => handleEditSubmit(index)}>Save</button>
              </>
            ) : (
              <>
                {item}
                <button onClick={() => handleEdit(index)}>Edit!</button>
                <button onClick={() => handleDelete(index)}>Delete!</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HabitList
