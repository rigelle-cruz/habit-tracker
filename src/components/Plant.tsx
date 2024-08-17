import { useEffect, useState } from 'react';

type PlantProps = {
	level: number;
};

const plantAssets = [
	// REMINDER!!
	// change temp files to actual asset names
	// example name 'group1-plant-1' and so on
	[
		'public/images/plant/temp-plant-1.jpg',
		'public/images/plant/temp-plant-2.jpg',
		'public/images/plant/temp-plant-3.jpg',
		'public/images/plant/temp-plant-4.jpg',
	],
	[
		'public/images/plant/temp-plant-1.jpg',
		'public/images/plant/temp-plant-2.jpg',
		'public/images/plant/temp-plant-3.jpg',
		'public/images/plant/temp-plant-4.jpg',
	],
	[
		'public/images/plant/temp-plant-1.jpg',
		'public/images/plant/temp-plant-2.jpg',
		'public/images/plant/temp-plant-3.jpg',
		'public/images/plant/temp-plant-4.jpg',
	],
	[
		'public/images/plant/temp-plant-1.jpg',
		'public/images/plant/temp-plant-2.jpg',
		'public/images/plant/temp-plant-3.jpg',
		'public/images/plant/temp-plant-4.jpg',
	],
	[
		'public/images/plant/temp-plant-1.jpg',
		'public/images/plant/temp-plant-2.jpg',
		'public/images/plant/temp-plant-3.jpg',
		'public/images/plant/temp-plant-4.jpg',
	],
];

const Plant = ({ level }: PlantProps) => {
	// Users get assigned a random plant seed.
	// Every 10 habit they complete, increment the plant's level
	// Pass the current level and image source according to the level
	// Whenever the plant reaches level 4, notify the user about the new seed
	// Whenever a habit is completed, it helps the seed grow into a plant ---> to promote productivity
	// They can view their collection of plants over time.

	// There are 5 groups of plant assets. Therefore, users get assigned a random plant to grow. So they get a 'new seed'.

	// To assign a user a new plant I randomly assign them a random number which signifies a particular group of assets. Each group are represent a particular plant type

	const [selectedPlantType, setSelectedPlantType] = useState<number>(0);

	useEffect(() => {
		if (level === 1) {
			const randomPlantType = Math.floor(Math.random() * plantAssets.length);
			setSelectedPlantType(randomPlantType);
		}
	}, [level]);

	return (
		<div>
			<img
				src={
					plantAssets[selectedPlantType][
						Math.min(level - 1, plantAssets[selectedPlantType].length - 1)
					]
				}
				alt={`Plant level ${level}`}
			/>
		</div>
	);
};

export default Plant;
