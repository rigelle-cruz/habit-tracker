import { Link } from 'react-router-dom';

const PlantCollection = () => {
	// displays all the fully grown plants

	return (
		<div>
			<h2>VIEW ALL PLANT COLLECTION</h2>
			<Link to="/habits">
				<button className="btn btn-secondary pixel-corners-no-border">
					View List!
				</button>
			</Link>
		</div>
	);
};

export default PlantCollection;
