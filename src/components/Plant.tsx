import { useEffect, useState } from 'react';

type PlantProps = {
	level: number;
};

const plantAssets = [
	// REMINDER!!
	// change temp files to actual asset names
	// example name 'group1-plant-1' and so on
	[
		'public/images/plant/plant-type-1-1.jpg',
		'public/images/plant/plant-type-1-2.jpg',
		'public/images/plant/plant-type-1-3.jpg',
		'public/images/plant/plant-type-1-4.jpg',
	],
	[
		'public/images/plant/plant-type-2-1.jpg',
		'public/images/plant/plant-type-2-2.jpg',
		'public/images/plant/plant-type-2-3.jpg',
		'public/images/plant/plant-type-2-4.jpg',
	],
	[
		'public/images/plant/plant-type-3-1.jpg',
		'public/images/plant/plant-type-3-2.jpg',
		'public/images/plant/plant-type-3-3.jpg',
		'public/images/plant/plant-type-3-4.jpg',
	],
	[
		'public/images/plant/plant-type-4-1.jpg',
		'public/images/plant/plant-type-4-2.jpg',
		'public/images/plant/plant-type-4-3.jpg',
		'public/images/plant/plant-type-4-4.jpg',
	],
	[
		'public/images/plant/plant-type-5-1.jpg',
		'public/images/plant/plant-type-5-2.jpg',
		'public/images/plant/plant-type-5-3.jpg',
		'public/images/plant/plant-type-5-4.jpg',
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
