import { useState } from 'react';
import styles from './App.module.css';

const sendData = (formData) => {
	console.log(formData);
};

export const App = () => {
	const [email, setEmail] = useState('');
	const [password1, setPassword1] = useState('');
	const [password2, setPassword2] = useState('');

	const onSubmit = (event) => {
		event.preventDefault();
		sendData({ email, password1, password2 });
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
					type="password"
					name="password1"
					value={password1}
					placeholder="Пароль"
					onChange={({ target }) => setPassword1(target.value)}
				/>
				<input
					type="password"
					name="password2"
					value={password2}
					placeholder="Повторите пароль"
					onChange={({ target }) => setPassword2(target.value)}
				/>
				<button type="submit">Отправить</button>
			</form>
		</div>
	);
};
