type HomeScreenProps = {
	onItemClick: () => void;
};

const HomeScreen = ({ onItemClick }: HomeScreenProps) => {
	return (
		<div className="home-screen">
			<h1>Welcome!</h1>
			<img
				src="public/images/pixel-heart.png"
				alt="Click to habits"
				onClick={onItemClick}
				className="clickable-asset"
			/>
		</div>
	);
};

export default HomeScreen;
