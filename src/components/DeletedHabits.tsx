import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {getDeletedHabitsFromLocalStorage} from '../models/deletedHabitsUtils';

const DeletedHabits = () => {
	const [deletedHabits, setDeletedHabits] = useState<string[]>([]);

	useEffect(() => {
		const savedDeletedHabits = getDeletedHabitsFromLocalStorage();
		console.log(savedDeletedHabits)
	}, []);

	return (
		<div>
			<h2>LIST OF DELETED HABITS HERE!</h2>
			<Link to="/habits">
				<button className="btn btn-secondary pixel-corners-no-border">
					View List!
				</button>
			</Link>
		</div>
	);
};

export default DeletedHabits;
