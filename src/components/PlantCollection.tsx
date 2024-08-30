import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCompletedPlants } from '../models/localStorageUtils';

const PlantCollection = () => {
	const [plantCollection, setPlantCollection] = useState<string[]>([]);

	useEffect(() => {
		const savedPlants = getCompletedPlants();
		setPlantCollection(savedPlants);
	}, []);

	return (
		<div>
			<h2>VIEW ALL PLANT COLLECTION</h2>
			<ul className="plant-collection">
				{plantCollection.map((plantImage, index) => (
					<li key={index}>
						<img src={plantImage} alt={`Plant ${index + 1}`} />
					</li>
				))}
			</ul>
			<Link to="/habits">
				<button className="btn btn-secondary pixel-corners-no-border">
					View List!
				</button>
			</Link>
		</div>
	);
};

export default PlantCollection;
