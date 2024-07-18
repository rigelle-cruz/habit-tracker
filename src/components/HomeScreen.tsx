type HomeScreenProps = {
	onItemClick: () => void;
};

const HomeScreen = ({ onItemClick }: HomeScreenProps) => {
	return (
		<div className="home-screen">
			<h1>Welcome!</h1>
			<img src="" alt="Click to habits" onClick={onItemClick} />
		</div>
	);
};

export default HomeScreen;
