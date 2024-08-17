import { Link } from 'react-router-dom';

const DeletedHabits = () => {
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
