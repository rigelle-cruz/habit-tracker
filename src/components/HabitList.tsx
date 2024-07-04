import { useEffect, useState } from 'react'

type Habit = {
  id: string
  text: string
}

const HabitList = () => {
  const [list, setList] = useState<Habit[]>([])
  const [input, setInput] = useState<string>('')
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [editingValue, setEditingValue] = useState<string>('')

  const LOCAL_STORAGE_KEY = 'habitTrackerList'

  useEffect(() => {
    try {
      const savedList = localStorage.getItem(LOCAL_STORAGE_KEY)
      console.log('Loaded from localStorage:', savedList)
      if (savedList) {
        setList(JSON.parse(savedList))
      }
    } catch (error) {
      console.error('Failed to load from localStorage:', error)
    }
  }, [])

  useEffect(() => {
    try {
      console.log('Saving to localStorage:', list)
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list))
    } catch (error) {
      console.error('Failed to save to localStorage:', error)
    }
  }, [list])

  const handleAdd = () => {
    if (input.trim()) {
      const newItem: Habit = { id: Date.now().toString(), text: input }
      setList([...list, newItem])
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
    setEditingValue(list[index].text)
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingValue(e.target.value)
  }

  const handleEditSubmit = (index: number) => {
    const newList = list.map((item, i) =>
      i === index ? { ...item, text: editingValue } : item
    )
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
          <li key={item.id} className="habit-item">
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
                {item.text}
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
