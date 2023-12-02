import { useState } from 'react';
import styles from './App.module.css';

const sendData = (formData) => {
	console.log(formData);
};

export const App = () => {
	const [formData, setFormData] = useState({
		email: '',
		password1: '',
		password2: '',
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
					type="password"
					name="password1"
					value={formData.password1}
					placeholder="Пароль"
					onChange={({ target }) =>
						setFormData({ ...formData, password1: target.value })
					}
				/>
				<input
					type="password"
					name="password2"
					value={formData.password2}
					placeholder="Повторите пароль"
					onChange={({ target }) =>
						setFormData({ ...formData, password2: target.value })
					}
				/>
				<button type="submit">Отправить</button>
			</form>
		</div>
	);
};
