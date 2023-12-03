import { useState, useRef } from 'react';
import styles from './App.module.css';

const App = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [emailEmpty, setEmailEmpty] = useState(true);
	const [passwordEmpty, setPasswordEmpty] = useState(true);
	const [confirmPasswordEmpty, setConfirmPasswordEmpty] = useState(true);
	const [emailError, setEmailError] = useState('Email не должен быть пустым');
	const [passwordError, setPasswordError] = useState('Пароль не должен быть пустым');
	const [confirmPasswordError, setConfirmPasswordError] = useState(
		'Пароль не должен быть пустым',
	);
	const [confirmError, setConfirmError] = useState('');
	const [formValid, setFormValid] = useState(false);

	const submitButtonRef = useRef(null);

	const emailChange = (e) => {
		setEmail(e.target.value);
		const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (!re.test(String(e.target.value).toLocaleLowerCase())) {
			setEmailError('Некорректный email');
		} else {
			setEmailError('');
		}
	};

	const passwordChange = (e) => {
		setPassword(e.target.value);
		if (e.target.value.length < 6 || e.target.value.length > 20) {
			setPasswordError('Пароль не может быть меньше 6 и больше 20 символов');
		} else {
			setPasswordError('');
		}
		if (
			!passwordError &&
			!confirmPasswordError &&
			confirmPassword !== e.target.value
		) {
			setConfirmError('Пароли не совпадают');
		} else {
			setConfirmError('');
		}
	};

	const confirmPasswordChange = (e) => {
		setConfirmPassword(e.target.value);
		if (e.target.value.length < 6 || e.target.value.length > 20) {
			setConfirmPasswordError('Пароль не может быть меньше 6 и больше 20 символов');
		} else {
			setConfirmPasswordError('');
		}
		if (!passwordError && !confirmPasswordError && password !== e.target.value) {
			setConfirmError('Пароли не совпадают');
		} else {
			setConfirmError('');
			isValid();
		}
	};

	const fieldBlur = (e) => {
		switch (e.target.name) {
			case 'email':
				setEmailEmpty(false);
				break;
			case 'password':
				setPasswordEmpty(false);
				break;
			case 'confirmPassword':
				setConfirmPasswordEmpty(false);
				break;
			default:
				break;
		}
	};

	const sendFormData = (formData) => {
		console.log(formData);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		sendFormData({ email, password, confirmPassword });
	};

	function isValid() {
		if (emailError || passwordError || confirmPasswordError || confirmError) {
			return false;
		} else {
			submitButtonRef.current.focus();
			return true;
		}
	}

	return (
		<div className={styles.App}>
			<form onSubmit={onSubmit}>
				<h1>Регистрация</h1>
				{!emailEmpty && emailError && (
					<div className={styles.error}>{emailError}</div>
				)}
				<div className={styles.field}>
					<input
						onChange={(e) => emailChange(e)}
						value={email}
						onBlur={(e) => fieldBlur(e)}
						name="email"
						type="text"
						placeholder="Введите ваш email..."
					/>
				</div>
				{!passwordEmpty && passwordError && (
					<div className={styles.error}>{passwordError}</div>
				)}
				<div className={styles.field}>
					<input
						onChange={(e) => passwordChange(e)}
						value={password}
						onBlur={(e) => fieldBlur(e)}
						name="password"
						type="password"
						placeholder="Введите пароль..."
					/>
				</div>
				{!confirmPasswordEmpty && confirmPasswordError && (
					<div className={styles.error}>{confirmPasswordError}</div>
				)}

				<div className={styles.field}>
					<input
						onChange={(e) => confirmPasswordChange(e)}
						value={confirmPassword}
						onBlur={(e) => fieldBlur(e)}
						name="confirmPassword"
						type="password"
						placeholder="Введите пароль ещё раз..."
					/>
				</div>
				{confirmError && <div className={styles.error}>{confirmError}</div>}
				<button
					ref={submitButtonRef}
					className={styles.button}
					type="submit"
					disabled={!isValid()}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};

export default App;
