import { useState, useRef, useEffect } from 'react';
import { Field } from './components';
import {
	emaiValidator,
	passwordMinValidator,
	passwordSymbolsValidator,
} from './validators';
import styles from './App.module.css';

const App = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passcheck, setPasscheck] = useState('');

	const [isEmailValid, setIsEmailValid] = useState(false);
	const [isPasswordValid, setIsPasswordValid] = useState(false);
	const [isPasscheckValid, setIsPasscheckValid] = useState(false);

	const submitButtonRef = useRef(null);

	const isFormValid = isEmailValid && isPasswordValid && isPasscheckValid;

	const onSubmit = (event) => {
		event.preventDefault();
		console.log({ email, password });
	};

	useEffect(() => {
		if (isFormValid) {
			submitButtonRef.current.focus();
		}
	}, [isFormValid]);

	return (
		<div className={styles.App}>
			<form onSubmit={onSubmit}>
				<Field
					type="text"
					name="email"
					placeholder="Почта..."
					value={email}
					setIsValid={setIsEmailValid}
					setValue={setEmail}
					validators={[emaiValidator]}
				/>
				<Field
					type="password"
					name="password"
					placeholder="Пароль..."
					value={password}
					setValue={setPassword}
					setIsValid={setIsPasswordValid}
					validators={[passwordMinValidator, passwordSymbolsValidator]}
				/>
				<Field
					type="password"
					name="passcheck"
					placeholder="Повтор пароля..."
					value={passcheck}
					setValue={setPasscheck}
					setIsValid={setIsPasscheckValid}
					validators={[
						(value) => (value === password ? null : 'Пароли не совпадают'),
					]}
					dependencies={{ password }}
					focreValidation={(value) => value.length > 0}
				/>
				<button type="submit" disabled={!isFormValid} ref={submitButtonRef}>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};

export default App;
