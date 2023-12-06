import { validate } from './utils';
import { useEffect, useState } from 'react';
import styles from './field.module.css';

export const Field = ({
	value,
	setValue,
	setIsValid,
	validators,
	dependencies = {},
	focreValidation = () => false,
	...props
}) => {
	const [error, setError] = useState(null);
	const [isDirty, setIsDirty] = useState();

	const validateField = (currentValue, shouldValidate) => {
		let error = null;
		let isValid = false;

		if (shouldValidate) {
			error = validate(currentValue, validators);
			isValid = error === null;
		}

		setError(error);
		setIsValid(isValid);
	};

	useEffect(() => {
		validateField(value, isDirty);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [...Object.values(dependencies)]);

	const onChange = ({ target }) => {
		setIsDirty(true);
		setValue(target.value);

		const isForceValidated = focreValidation(target.value);
		validateField(target.value, isForceValidated);
	};

	const onBlur = () => validateField(value, isDirty);

	return (
		<div>
			<input onChange={onChange} onBlur={onBlur} {...props} />
			{error && <span className={styles.errorLabel}>{error}</span>}
		</div>
	);
};
