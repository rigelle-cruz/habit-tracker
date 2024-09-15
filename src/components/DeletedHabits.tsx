import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  getDeletedHabitsFromLocalStorage,
  DeletedHabit,
  recoverDeletedHabitToActiveList,
} from '../models/deletedHabitsUtils'

const DeletedHabits = () => {
  const [deletedHabits, setDeletedHabits] = useState<DeletedHabit[]>([])

  useEffect(() => {
    const savedDeletedHabits = getDeletedHabitsFromLocalStorage()
    setDeletedHabits(savedDeletedHabits)
  }, [])

  const recoverHabit = (habit: DeletedHabit) => {
    recoverDeletedHabitToActiveList(habit)
    setDeletedHabits((prevHabits) =>
      prevHabits.filter((h) => h.id !== habit.id)
    )
  }

  return (
    <div>
      <h2>Deleted Habits</h2>
      <ul className="deleted-habits">
        {deletedHabits.map((habit) => (
          <li key={habit.id} className="deleted-habit-item">
            <span>{habit.text}</span>
            <button
              className="btn btn-primary pixel-corners-no-border"
              onClick={() => recoverHabit(habit)}
            >
              Recover
            </button>
          </li>
        ))}
      </ul>
      <Link to="/habits">
        <button className="btn btn-secondary pixel-corners-no-border">
          View List!
        </button>
      </Link>
    </div>
  )
}

export default DeletedHabits
