import { useState } from 'react';
import styles from './App.module.css';

// Всё состояние лежит в одном объекте, его можно вынести в другой файл

const initialState = {
	email: '',
	password1: '',
	password2: '',
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

	const { email, password1, password2 } = getState();

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
					type="password"
					name="password1"
					value={password1}
					placeholder="Пароль"
					onChange={onChange}
				/>
				<input
					type="password"
					name="password2"
					value={password2}
					placeholder="Повторите пароль"
					onChange={onChange}
				/>
				<button type="submit">Отправить</button>
			</form>
		</div>
	);
};
