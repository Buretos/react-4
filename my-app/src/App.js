import { useState } from 'react';
import styles from './App.module.css';

const sendData = (formData) => {
	console.log(formData);
};

export const App = () => {
	const [email, setEmail] = useState('');
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');

	const onSubmit = (event) => {
		event.preventDefault();
		sendData({ email, login, password });
	};

	return (
		<div className={styles.App}>
			<form onSubmit={onSubmit}>
				<input
					type="email"
					name="email"
					value={email}
					placeholder="Почта"
					onChange={({ target }) => setEmail(target.value)}
				/>
				<input
					type="text"
					name="login"
					value={login}
					placeholder="Логин"
					onChange={({ target }) => setLogin(target.value)}
				/>
				<input
					type="password"
					name="password"
					value={password}
					placeholder="Пароль"
					onChange={({ target }) => setPassword(target.value)}
				/>
				<button type="submit">Отправить</button>
			</form>
		</div>
	);
};
