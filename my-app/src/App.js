import { useEffect, useState } from 'react';
import styles from './app.module.css';

export const App = () => {
	const [counter, setCounter] = useState(0);

	useEffect(() => {
		console.log('Первый коллбэк -', counter);

		return () => console.log('Второй коллбэк -', counter);
	}, [counter]);

	return (
		<div className={styles.app}>
			<button onClick={() => setCounter(counter + 1)}>+ 1</button>
		</div>
	);
};
