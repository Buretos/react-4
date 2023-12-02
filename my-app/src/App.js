import { useState } from 'react';
import styles from './App.module.css';

const sendData = (formData) => {
	console.log(formData);
};

export const App = () => {
	const [formData, setFormData] = useState({
		email: '',
		login: '',
		password: '',
	});

	const onSubmit = (event) => {
		event.preventDefault();
		sendData(formData);
	};

	return (
		<div className={styles.App}>
			<form onSubmit={onSubmit}>
				<input
					type="email"
					name="email"
					value={formData.email}
					placeholder="Почта"
					onChange={({ target }) =>
						setFormData({ ...formData, email: target.value })
					}
				/>
				<input
					type="text"
					name="login"
					value={formData.login}
					placeholder="Логин"
					onChange={({ target }) =>
						setFormData({ ...formData, login: target.value })
					}
				/>
				<input
					type="password"
					name="password"
					value={formData.password}
					placeholder="Пароль"
					onChange={({ target }) =>
						setFormData({ ...formData, password: target.value })
					}
				/>
				<button type="submit">Отправить</button>
			</form>
		</div>
	);
};
