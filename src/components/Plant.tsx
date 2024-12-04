import { useEffect, useState } from 'react';

type PlantProps = {
	level: number;
  seed?: number;
};

const plantAssets = [
	[
		'/images/plant/plant-type-1-1.png',
		'/images/plant/plant-type-1-2.png',
		'/images/plant/plant-type-1-3.png',
		'/images/plant/plant-type-1-4.png',
	],
	[
		'/images/plant/plant-type-2-1.png',
		'/images/plant/plant-type-2-2.png',
		'/images/plant/plant-type-2-3.png',
		'/images/plant/plant-type-2-4.png',
	],
	[
		'/images/plant/plant-type-3-1.png',
		'/images/plant/plant-type-3-2.png',
		'/images/plant/plant-type-3-3.png',
		'/images/plant/plant-type-3-4.png',
	],
	[
		'/images/plant/plant-type-4-1.png',
		'/images/plant/plant-type-4-2.png',
		'/images/plant/plant-type-4-3.png',
		'/images/plant/plant-type-4-4.png',
	],
	[
		'/images/plant/plant-type-5-1.png',
		'/images/plant/plant-type-5-2.png',
		'/images/plant/plant-type-5-3.png',
		'/images/plant/plant-type-5-4.png',
	],
];

const Plant = ({ level, seed }: PlantProps) => {
	const [selectedPlantType, setSelectedPlantType] = useState<number>(0);

	useEffect(() => {
		if (level === 1) {
			const randomPlantType = Math.floor(Math.random() * plantAssets.length);
			setSelectedPlantType(randomPlantType);
		}
	}, [seed]);

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
