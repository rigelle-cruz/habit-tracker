import {
  getHabitsFromLocalStorage,
  setHabitsInLocalStorage,
} from './localStorageUtils'

export type DeletedHabit = {
  id: string
  text: string
  completed: boolean
}

const DELETED_HABITS_KEY = 'deletedHabits'

// To retrieve and parse deleted habits from local storage
export function getDeletedHabitsFromLocalStorage(): DeletedHabit[] {
  const habits = localStorage.getItem(DELETED_HABITS_KEY)
  return habits ? JSON.parse(habits) : []
}

// To set deleted habits in local storage
export function setDeletedHabitsInLocalStorage(habits: DeletedHabit[]) {
  localStorage.setItem(DELETED_HABITS_KEY, JSON.stringify(habits))
}

// To add a new deleted habit to local storage
export function addDeletedHabitToLocalStorage(habit: DeletedHabit): void {
  const habits = getDeletedHabitsFromLocalStorage()
  habits.push(habit)
  setDeletedHabitsInLocalStorage(habits)
}

// Recovers deleted habit to active habit list
export function recoverDeletedHabitToActiveList(habit: DeletedHabit): void {
  const deletedHabits = getDeletedHabitsFromLocalStorage()

  const updatedDeletedHabits = deletedHabits.filter((h) => h.id !== habit.id)
  setDeletedHabitsInLocalStorage(updatedDeletedHabits)

  const activeHabit = {
    id: habit.id,
    text: habit.text,
    completed: habit.completed,
  }

  const activeHabits = getHabitsFromLocalStorage()

  activeHabits.push(activeHabit)
  setHabitsInLocalStorage(activeHabits)
}
