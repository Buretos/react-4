import { useState, useRef } from 'react';
import styles from './App.module.css';

const initialState = {
	email: '',
	password1: '',
	password2: '',
	errorEmail: '',
	errorPassword1: '',
	errorPassword2: '',
};

const useStore = () => {
	const [state, setState] = useState(initialState);
	const submitButtonRef = useRef(null);

	return {
		getState: () => state,
		updateState: (fieldName, newValue) => {
			setState({ ...state, [fieldName]: newValue });
		},
		submitButtonRef,
	};
};

const sendData = (formData) => {
	console.log(formData);
};

export const App = () => {
	const { getState, updateState, submitButtonRef } = useStore();

	const validateEmail = () => {
		const { email } = getState();
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!emailRegex.test(email)) {
			updateState('errorEmail', 'Неверный формат адреса электронной почты');
		} else {
			updateState('errorEmail', '');
		}
	};

	const validatePasswords = () => {
		const { password1, password2 } = getState();

		if (password1.length < 6) {
			updateState('errorPassword1', 'Пароль должен быть не менее 6 символов');
		} else if (password1.length > 20) {
			updateState('errorPassword1', 'Пароль не должен превышать 20 символов');
		} else {
			updateState('errorPassword1', '');
		}

		if (password2.length < 6) {
			updateState('errorPassword2', 'Пароль должен быть не менее 6 символов');
		} else if (password2.length > 20) {
			updateState('errorPassword2', 'Пароль не должен превышать 20 символов');
		} else {
			updateState('errorPassword2', '');
		}

		if (password1 !== password2) {
			updateState('errorPassword2', 'Пароли не совпадают');
		} else {
			updateState('errorPassword2', '');
		}
	};

	const onSubmit = (event) => {
		event.preventDefault();
		validateEmail();
		validatePasswords();

		const { errorEmail, errorPassword1, errorPassword2 } = getState();

		if (!errorEmail && !errorPassword1 && !errorPassword2) {
			// sendData(getState());
			submitButtonRef.current.focus();
		}
	};

	const { email, password1, password2, errorEmail, errorPassword1, errorPassword2 } =
		getState();

	const onChange = ({ target }) => {
		updateState(target.name, target.value);
	};

	return (
		<div className={styles.App}>
			<form onSubmit={onSubmit}>
				{errorEmail && <div className={styles.error}>{errorEmail}</div>}
				<div>
					<input
						type="email"
						name="email"
						value={email}
						placeholder="Почта"
						onChange={onChange}
						onBlur={validateEmail}
					/>
				</div>
				{errorPassword1 && <div className={styles.error}>{errorPassword1}</div>}
				<div>
					<input
						type="password"
						name="password1"
						value={password1}
						placeholder="Пароль"
						onChange={onChange}
						onBlur={validatePasswords}
					/>
				</div>
				{errorPassword2 && <div className={styles.error}>{errorPassword2}</div>}
				<div>
					<input
						type="password"
						name="password2"
						value={password2}
						placeholder="Повторите пароль"
						onChange={onChange}
						onBlur={validatePasswords}
					/>
				</div>
				<div>
					<button
						type="submit"
						disabled={
							errorEmail ||
							errorPassword1 ||
							errorPassword2 ||
							!email.length ||
							!password1.length ||
							!password2.length
						}
						ref={submitButtonRef}
					>
						Отправить
					</button>
				</div>
			</form>
		</div>
	);
};
