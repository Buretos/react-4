import { useEffect, useState } from 'react';
import styles from './app.module.css';

export const App = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		fetch('https://mocki.io/v1/49741d30-63a8-4662-9e80-fc4f949d2758')
			.then((loadedData) => loadedData.json())
			.then((loadedProducts) => {
				setProducts(loadedProducts);
			});
	}, []);

	return (
		<div className={styles.app}>
			{products.map(({ id, name, price }) => (
				<div key={id}>
					{name} - {price} руб.
				</div>
			))}
		</div>
	);
};
