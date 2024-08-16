import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import HabitList from './components/HabitList';
import DeletedHabit from './components/DeletedHabits';
import PlantCollection from './components/PlantCollection';
import { useEffect } from 'react';

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
			<Router>
				<Routes>
					<Route
						path="/"
						element={
							<HomeScreen
								onItemClick={() => (window.location.href = '/habits')}
							/>
						}
					/>
					<Route path="/habits" element={<HabitList />} />

					<Route path="/deleted-habits" element={<DeletedHabit />} />

					<Route path="/plant-collection" element={<PlantCollection />} />
				</Routes>
			</Router>

			<div className="pixel-background">
				{[...Array(1000)].map((_, index: number) => (
					<div key={index} className="pixel"></div>
				))}
			</div>
		</div>
	);
}

export default App;
