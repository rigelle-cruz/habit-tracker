type HomeScreenProps = {
	onItemClick: () => void;
};

const HomeScreen = ({ onItemClick }: HomeScreenProps) => {
	return (
		<div className="home-screen">
			<img
				src="/images/pixel-heart.png"
				alt="Click to habits"
				onClick={onItemClick}
				className="clickable-asset"
			/>
			<h1>Click to View List!</h1>
		</div>
	);
};

export default HomeScreen;
