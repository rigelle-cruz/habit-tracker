type Habit = {
	id: string;
	text: string;
	completed: boolean;
};

const LOCAL_STORAGE_KEY = 'habitTrackerAppList';
const COMPLETED_PLANTS_KEY = 'completedPlants';

// To get and parse habits from local storage
export function getHabitsFromLocalStorage(): Habit[] {
	const habits = localStorage.getItem(LOCAL_STORAGE_KEY);
	return habits ? JSON.parse(habits) : [];
}

// To set habits in local storage
export function setHabitsInLocalStorage(habits: Habit[]) {
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(habits));
}

// To add a new habit to local storage
export function addHabitToLocalStorage(habit: Habit): void {
	const habits = getHabitsFromLocalStorage();
	habits.push(habit);
	setHabitsInLocalStorage(habits);
}

// To update a habit in local storage
export function updateHabitInLocalStorage(habit: Habit): void {
	const habits = getHabitsFromLocalStorage();
	const index = habits.findIndex((h) => h.id === habit.id);
	if (index !== -1) {
		habits[index] = habit;
	}
	setHabitsInLocalStorage(habits);
}

// To remove a habit from local storage
export function removeHabitFromLocalStorage(habitId: string): void {
	let habits = getHabitsFromLocalStorage();
	habits = habits.filter((habit) => habit.id !== habitId);
	setHabitsInLocalStorage(habits);
}

// To add a plant image path to the completed plants list in local storage
export function addPlantToCollection(imagePath: string): void {
	const completedPlants = getCompletedPlants();
	if (!completedPlants.includes(imagePath)) {
		completedPlants.push(imagePath);
		localStorage.setItem(COMPLETED_PLANTS_KEY, JSON.stringify(completedPlants));
	}
}

// To get the list of completed plants from local storage
export function getCompletedPlants(): string[] {
	const plants = localStorage.getItem(COMPLETED_PLANTS_KEY);
	return plants ? JSON.parse(plants) : [];
}
