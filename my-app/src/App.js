import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './App.module.css';

const App = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	const emailProps = {
		pattern: {
			value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			message: 'Некоректно введён email.',
		},
	};

	const passwordProps = {
		minLength: { value: 6, message: 'Должно быть больше 6 символов' },
		maxLength: { value: 20, message: 'Должно быть не больше 20 символов' },
	};

	const confirmPasswordProps = {
		minLength: { value: 6, message: 'Должно быть больше 6 символов' },
		maxLength: { value: 20, message: 'Должно быть не больше 20 символов' },
		// validate: {value: value === password.current || "Пароли не совпадают"
	};

	const emailError = errors.email?.message;
	const passwordError = errors.password?.message;
	const confirmPasswordError = errors.confirmPassword?.message;
	const [confirmError, setConfitmError] = useState('');

	const onSubmit = (formData) => {
		if (formData.password === formData.confirmPassword) {
			setConfitmError('');
			console.log(formData);
		} else {
			setConfitmError('Пароли не совпадают');
		}
	};

	return (
		<div className={styles.App}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h1>Регистрация</h1>
				{emailError && <div className={styles.error}>{emailError}</div>}
				<div className={styles.field}>
					<input
						name="email"
						type="text"
						placeholder="Введите ваш email..."
						{...register('email', emailProps)}
					/>
				</div>
				{passwordError && <div className={styles.error}>{passwordError}</div>}
				<div className={styles.field}>
					<input
						name="password"
						type="password"
						placeholder="Введите пароль"
						{...register('password', passwordProps)}
					/>
				</div>
				{confirmPasswordError && (
					<div className={styles.error}>{confirmPasswordError}</div>
				)}
				<div className={styles.field}>
					<input
						name="confirmPassword"
						type="password"
						placeholder="Повторите пароль"
						{...register('confirmPassword', confirmPasswordProps)}
					/>
				</div>
				{confirmError && <div className={styles.error}>{confirmError}</div>}
				<button
					className={styles.button}
					type="submit"
					disabled={!!emailError || !!passwordError}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};

export default App;
