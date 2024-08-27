import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
	addHabitToLocalStorage,
	addPlantToCollection,
	getHabitsFromLocalStorage,
	removeHabitFromLocalStorage,
	updateHabitInLocalStorage,
} from '../models/localStorageUtils.ts';
import { HabitSchema, Habit } from '../models/habitSchema.ts';
import {
	addDeletedHabitToLocalStorage,
	getDeletedHabitsFromLocalStorage,
} from '../models/deletedHabitsUtils.ts';
import Plant from './Plant';

const HabitList = () => {
	const [list, setList] = useState<Habit[]>([]);
	const [input, setInput] = useState<string>('');
	const [editIndex, setEditIndex] = useState<number | null>(null);
	const [editingValue, setEditingValue] = useState<string>('');
	const [showCompleted, setShowCompleted] = useState<boolean>(false);
	const [completedCount, setCompletedCount] = useState<number>(0);
	const [plantLevel, setPlantLevel] = useState<number>(1);

	useEffect(() => {
		const savedHabits = getHabitsFromLocalStorage();
		const parsedHabits = HabitSchema.array().safeParse(savedHabits);

		if (parsedHabits.success) {
			console.log('Loaded from localStorage:', parsedHabits.data);
			setList(parsedHabits.data);
		} else {
			console.error(
				'Error loading habits from localStorage:',
				parsedHabits.error
			);
		}
	}, []);

	const handleAdd = () => {
		if (input.trim()) {
			const newItem: Habit = {
				id: Date.now().toString(),
				text: input,
				completed: false,
			};
			setList((prevList) => [...prevList, newItem]);
			addHabitToLocalStorage(newItem);
			setInput('');
		}
	};

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleAdd();
		}
	};

	const handleDelete = (index: number) => {
		const habitId = list[index].id;
		const habitToDelete = list[index];
		const newList = list.filter((_, i) => i !== index);
		setList(newList);
		addDeletedHabitToLocalStorage(habitToDelete);
		removeHabitFromLocalStorage(habitId);
	};

	const handleEdit = (index: number) => {
		setEditIndex(index);
		setEditingValue(list[index].text);
	};

	const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEditingValue(e.target.value);
	};

	const handleEditSubmit = (index: number) => {
		const updatedHabit = { ...list[index], text: editingValue };
		const newList = list.map((item, i) => (i === index ? updatedHabit : item));
		setList(newList);
		updateHabitInLocalStorage(updatedHabit);
		setEditIndex(null);
	};

	const handleComplete = (index: number) => {
		const updatedHabit = { ...list[index], completed: !list[index].completed };
		const newList = list.map((item, i) => (i === index ? updatedHabit : item));
		setList(newList);
		updateHabitInLocalStorage(updatedHabit);

		// Retrieve active and deleted habits
		const activeHabits = getHabitsFromLocalStorage();
		const deletedHabits = getDeletedHabitsFromLocalStorage();
		const allHabits = [...activeHabits, ...deletedHabits];

		const newCompletedCount = allHabits.filter(
			(habit) => habit.completed
		).length;

		// Calculate the plant type and level
		const milestone = 40;
		const remainder = newCompletedCount % milestone;
		const plantTypeIndex = Math.floor(newCompletedCount / milestone) % 5;

		let newLevel = Math.floor(remainder / 10) + 1;
		newLevel = Math.min(newLevel, 4);

		if (remainder === 0 && newCompletedCount > 0) {
			alert('NEW SEED AVAILABLE!!');

			const imagePath = `public/images/plant/plant-type-${
				plantTypeIndex + 1
			}-4.jpg`; // to ensure that I retrieve the right plant level I hard coded number '4' as it's the final level of the plant
			addPlantToCollection(imagePath);
		}

		setCompletedCount(remainder);
		setPlantLevel(newLevel);
	};

	const filteredList = showCompleted
		? list.filter((habit) => habit.completed)
		: list;

	return (
		<div>
			<div className="navigation">
				<Link to="/deleted-habits">
					<button className="btn btn-secondary pixel-corners-no-border">
						View Deleted Habits
					</button>
				</Link>

				<Link to="/plant-collection">
					<button className="btn btn-secondary pixel-corners-no-border">
						View Plant Collection
					</button>
				</Link>
			</div>

			<div className="habit-container pixel-corners">
				<h1>Habit Tracker</h1>
				<div className="input-group">
					<input
						className="pixel-corners-no-border"
						type="text"
						value={input}
						onChange={handleInput}
						onKeyDown={handleKeyDown}
						placeholder="Enter a new habit..."
					/>
					<button className=" pixel-corners-no-border" onClick={handleAdd}>
						Add
					</button>
				</div>

				<ul className="habit-list">
					{filteredList.length > 0 ? (
						filteredList.map((item, index) => (
							<li
								key={item.id}
								className={`habit-item pixel-corners-no-border ${
									item.completed ? 'completed' : ''
								}`}>
								{editIndex === index ? (
									<>
										<input
											type="text"
											value={editingValue}
											onChange={handleEditChange}
											onKeyDown={(e) => {
												if (e.key === 'Enter') handleEditSubmit(index);
											}}
										/>
										<button onClick={() => handleEditSubmit(index)}>
											Save
										</button>
									</>
								) : (
									<>
										<input
											type="checkbox"
											checked={item.completed}
											onChange={() => handleComplete(index)}
										/>
										<span>{item.text}</span>
										<div>
											<button onClick={() => handleEdit(index)}>
												<i className="fas fa-edit"></i>
											</button>
											<button onClick={() => handleDelete(index)}>
												<i className="fas fa-trash"></i>
											</button>
										</div>
									</>
								)}
							</li>
						))
					) : (
						<p></p>
					)}

					<button
						className=" pixel-corners-no-border"
						onClick={() => setShowCompleted(!showCompleted)}>
						{showCompleted ? 'Show All' : 'Show Completed'}
					</button>
				</ul>
			</div>
			<div className="plant-section">
				<Plant level={plantLevel} key={completedCount} />
			</div>
		</div>
	);
};

export default HabitList;
