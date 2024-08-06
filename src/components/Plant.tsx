type PlantProps = {
  level:number;
}

const plantAssets = [
  'public/images/plant/temp-plant-1.jpg',
  'public/images/plant/temp-plant-2.jpg',
  'public/images/plant/temp-plant-3.jpg',
  'public/images/plant/temp-plant-4.jpg',
]

export const Plant = () => {

  // Users get assigned a random plant seed.
  // Every 10 habit they complete, increment the plant's level
  // Pass the current level and image source according to the level
  // Whenever the plant reaches level 4, notify the user about the new seed
  // Whenever a habit is completed, it helps the seed grow into a plant ---> to promote productivity
  // They can view their collection of plants over time.

  return (
    <div>Plant Here!</div>
  )
}


