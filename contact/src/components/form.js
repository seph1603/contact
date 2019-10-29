import React, { useReducer } from 'react';
import styles from './form.module.css'

const INITIAL_STATE = {
	name: '',
	email: '',
	subject: '',
	body: ''
};

const reducer = (state, action) => {
	switch (action.type){
		case 'updateFieldValue':
			return { ...state, [action.field]:
				action.value };
		default:
			return INITIAL_STATE
	}
}

const Form = () => {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
	
	const updateFieldValue = field => event => {
		dispatch({
			type:  'updateFieldValue',
			field,
			value: event.target.value
		});
	}

	const handleSubmit = event => {
		event.preventDefault();
		//TODO actually send the message
		console.log(state);
	}
	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<label className={styles.label}>
				Name
				<input
				value={state.name} 
				type="text" 
				name="name" 
				className={styles.input}
				onChange={updateFieldValue('name')}
				/>
			</label>
			<label className={styles.label}>
				Email
				<input onChange={updateFieldValue('email')} value={state.email}  type="email" name="email" className={styles.input}/>
			</label>
			<label className={styles.label}>
				Subject
				<input onChange={updateFieldValue('subject')} value={state.subject}  type="text" name="subject" className={styles.input}/>
			</label>
			<label className={styles.label}>
				Body
				<textarea onChange={updateFieldValue('body')}  value={state.body}  name="body" className={styles.input}/>
			</label>
			<button className={styles.button}>Send</button>
		</form>
	);
}

export default Form;