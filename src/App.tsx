import { useEffect } from 'react';
import './App.css';
import HabitList from './components/HabitList';

function App() {
	useEffect(() => {
		const pix = document.getElementsByClassName(
			'pixel'
		) as HTMLCollectionOf<HTMLElement>;

		for (let i = 0; i < pix.length; i++) {
			pix[i].style.animationDelay = Math.ceil(Math.random() * 5000) + 'ms';
		}
	}, []);

	return (
		<div className="App">
			<div className="pixel-background">
				{[...Array(80)].map((_, index: number) => (
					<div key={index} className="pixel"></div>
				))}
			</div>
			<HabitList />
		</div>
	);
}

export default App;
