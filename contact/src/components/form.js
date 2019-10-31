import React, {useReducer} from 'react';
import styles from './form.module.css'

const INITIAL_STATE = {
    name: '',
    email: '',
    subject: '',
    body: '',
    status: 'IDLE'
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'updateFieldValue':
            return {
                ...state, [action.field]:
                action.value
            };
        case 'updateStatus':
            return {...state, status: action.status};

        case 'reset':
        default:
            return INITIAL_STATE
    }
};

const Form = () => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    const setStatus = status => dispatch({type: 'updateStatus', status});

    const updateFieldValue = field => event => {
        dispatch({
            type: 'updateFieldValue',
            field,
            value: event.target.value
        });
    };

    const handleSubmit = event => {
        event.preventDefault();
        setStatus('PENDING');

        fetch('/api/contact', {
            method: 'POST',
            body: JSON.stringify(state)
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                setStatus('SUCCESS');
            })
            .catch(error => {
                console.log(error);
                setStatus('ERROR');
            })
    };

    if (state.status === 'SUCCESS') {
        return (
            <div>
                <p className={styles.success}>
                    Message sent!
                </p>
                <button type="reset" onClick={() => dispatch({type: 'reset'})}
                        className={`${styles.button} ${styles.reset}`}>Go back
                </button>
            </div>
        );
    }

    return (
        <>
            {state.status === 'ERROR' && (<p className={styles.error}>Something went wrong. Please try again</p>)}
            <form className={`${styles.form} ${state.status === 'PENDING' && styles.pending}`} onSubmit={handleSubmit}>
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
                    <input onChange={updateFieldValue('email')} value={state.email} type="email" name="email"
                           className={styles.input}/>
                </label>
                <label className={styles.label}>
                    Subject
                    <input onChange={updateFieldValue('subject')} value={state.subject} type="text" name="subject"
                           className={styles.input}/>
                </label>
                <label className={styles.label}>
                    Body
                    <textarea onChange={updateFieldValue('body')} value={state.body} name="body"
                              className={styles.input}/>
                </label>
                <button className={styles.button}>Send</button>
            </form>
        </>
    );
};

export default Form;