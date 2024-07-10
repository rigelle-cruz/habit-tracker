import { useEffect, useState } from 'react';
import {
	addHabitToLocalStorage,
	getHabitsFromLocalStorage,
	removeHabitFromLocalStorage,
	updateHabitInLocalStorage,
} from './localStorageUtils.ts';

type Habit = {
	id: string;
	text: string;
};

const HabitList = () => {
	const [list, setList] = useState<Habit[]>([]);
	const [input, setInput] = useState<string>('');
	const [editIndex, setEditIndex] = useState<number | null>(null);
	const [editingValue, setEditingValue] = useState<string>('');

	useEffect(() => {
		const savedHabits = getHabitsFromLocalStorage();
		console.log('Loaded from localStorage:', savedHabits);
		setList(savedHabits);
	}, []);

	const handleAdd = () => {
		if (input.trim()) {
			const newItem: Habit = { id: Date.now().toString(), text: input };
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
		const newList = list.filter((_, i) => i !== index);
		setList(newList);
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

	return (
		<div className="habit-container pixel-corners pixel-border">
			<h1>Habit Tracker</h1>
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
				{list.length > 0 ? (
					list.map((item, index) => (
						<li key={item.id} className="habit-item pixel-corners-list">
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
									<button onClick={() => handleEditSubmit(index)}>Save</button>
								</>
							) : (
								<>
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
			</ul>
		</div>
	);
};

export default HabitList;
