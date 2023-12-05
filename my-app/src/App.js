import { useState } from 'react';
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

	const [isEmailValide, setIsEmailValide] = useState(false);
	const [isPasswordValide, setIsPasswordValide] = useState(false);
	const [isPasscheckValide, setIsPasscheckValide] = useState(false);

	const isFormValide = isEmailValide && isPasswordValide && isPasscheckValide;

	return (
		<div className={styles.App}>
			<form>
				<Field
					type="text"
					name="email"
					placeholder="Почта..."
					value={email}
					setValue={setEmail}
					validators={[emaiValidator]}
				/>
				<Field
					type="password"
					name="password"
					placeholder="Пароль..."
					value={password}
					setValue={setPassword}
					validators={[passwordMinValidator, passwordSymbolsValidator]}
				/>
				<Field
					type="password"
					name="passcheck"
					placeholder="Повтор пароля..."
					value={passcheck}
					setValue={setPasscheck}
					validators={[
						(value) => (value === password ? null : 'Пароли не совпадают'),
					]}
					dependencies={['password']}
				/>
				<button type="submit" disabled={!isFormValide}>
					Зарегистрировать
				</button>
			</form>
		</div>
	);
};

export default App;
