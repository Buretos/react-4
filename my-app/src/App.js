import { useState } from 'react';
import styles from './App.module.css';

// Всё состояние лежит в одном объекте, его можно вынести в другой файл

const initialState = {
	email: '',
	login: '',
	password: '',
};

// Можно вынести и функцию, которая будет обновлять состояние
const useStore = () => {
	const [state, setState] = useState(initialState);

	return {
		getState: () => state, // получаем текущее состояние
		updateState: (fieldName, newValue) => {
			setState({ ...state, [fieldName]: newValue });
		},
	};
};

const sendData = (formData) => {
	console.log(formData);
};

export const App = () => {
	const { getState, updateState } = useStore();

	const onSubmit = (event) => {
		event.preventDefault();
		sendData(getState());
	};

	const { email, login, password } = getState();

	const onChange = ({ target }) => updateState(target.name, target.value);

	return (
		<div className={styles.App}>
			<form onSubmit={onSubmit}>
				<input
					type="email"
					name="email"
					value={email}
					placeholder="Почта"
					onChange={onChange}
				/>
				<input
					type="text"
					name="login"
					value={login}
					placeholder="Логин"
					onChange={onChange}
				/>
				<input
					type="password"
					name="password"
					value={password}
					placeholder="Пароль"
					onChange={onChange}
				/>
				<button type="submit">Отправить</button>
			</form>
		</div>
	);
};
