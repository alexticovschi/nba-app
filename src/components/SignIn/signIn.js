import React, { Component } from 'react';
import styles from './signIn.css';

import FormField from '../widgets/FormFields/formFields';

class SignIn extends Component {

    state = {
        registerError: '',
        loading: false,
        formData: {
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter Your Email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            password: {
                element: 'input',
                value: '',
                config: {
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter Your Password'
                },
                validation: {
                    required: true,
                    password: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            }
        }
    }

    updateForm = (element) => {
        console.log(element);
    }

    render() {
        console.log(this.state);
        return (
            <div className={styles.logContainer}>
                <form>
                    <FormField
                        formData={this.state.formData.email}
                        id={'email'}
                        change={(element)=>this.updateForm(element)}
                    />                  
                </form>
            </div>
        )
    }
}


export default SignIn;