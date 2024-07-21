import { useEffect, useState } from 'react';
import './App.css';
import HabitList from './components/HabitList';
import HomeScreen from './components/HomeScreen';

function App() {
	const [showList, setShowList] = useState(false);

	useEffect(() => {
		const pix = document.getElementsByClassName(
			'pixel'
		) as HTMLCollectionOf<HTMLElement>;

		for (let i = 0; i < pix.length; i++) {
			pix[i].style.animationDelay = Math.ceil(Math.random() * 5000) + 'ms';
		}
	}, []);

	const handleAssetClick = () => {
		setShowList(true);
	};

	return (
		<div className="App">
			{showList ? <HabitList /> : <HomeScreen onItemClick={handleAssetClick} />}
			<div className="pixel-background">
				{[...Array(1000)].map((_, index: number) => (
					<div key={index} className="pixel"></div>
				))}
			</div>
		</div>
	);
}

export default App;
