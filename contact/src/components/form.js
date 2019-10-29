import React from 'react';
import styles from './form.module.css'

const Form = () => {
	const handleSubmit = event => {
		event.preventDefault();
		//TODO actually send the message
	}
	return (
		<form className={styles.form}>
			<label className={styles.label}>
				Name
				<input type="text" name="name" className={styles.input}/>
			</label>
			<label className={styles.label}>
				Email
				<input type="email" name="email" className={styles.input}/>
			</label>
			<label className={styles.label}>
				Subject
				<input type="text" name="subject" className={styles.input}/>
			</label>
			<label className={styles.label}>
				Body
				<textarea name="body" className={styles.input}/>
			</label>
			<button onClick={handleSubmit} className={styles.button}>Send</button>
		</form>
	);
}

export default Form;