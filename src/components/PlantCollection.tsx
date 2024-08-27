import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCompletedPlants } from '../models/localStorageUtils';

const PlantCollection = () => {
	// displays all the fully grown plants

	const [plantCollection, setPlantCollection] = useState<string[]>([]);

	useEffect(() => {
		const savedPlants = getCompletedPlants(); // this retrieves the plant collection from localStorage
		setPlantCollection(savedPlants); //this stores the retrieved plant collection
	}, []); //Empty array to insert the retrieved data

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
