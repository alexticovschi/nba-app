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
        // copy of the previous state
        const newFormData = {
            ...this.state.formData
        }
        const newElement = {
            ...newFormData[element.id]
        }

        newElement.value = element.event.target.value;
        if(element.blur) {
            let validData = this.validate(newElement);
            // console.log('validData', validData);
            newElement.valid = validData[0]; // newElement.value equals the first value of the array; true or false
            newElement.validationMessage = validData[1]; // validationMessage will contain a message
        }

        newElement.touched = element.blur; // true or false
        newFormData[element.id] = newElement;
        
        let log = console.log;
        log(newFormData);
        
        this.setState({
            formData: newFormData
        })
    }

    validate = (element) => {
        // if the error variable contains true and empty string, the input is valid
        let error = [true, ''];

        if(element.validation.email) {
            const valid = /\S+@\S+\.\S+/.test(element.value);
            const message = `${!valid ? 'Must be a valid email' : ''}`;
            error = !valid ? [valid, message] : error;
        }        

        if(element.validation.password) {
            // true if it's not empty, false otherwise
            const valid = element.value.length >= 5;

            // if not valid, return a message, else return an empty string
            const message = `${!valid ? 'Must be greater than 5' : ''}`;
            // if not valid error returns false with a message, otherwise returns the default state
            error = !valid ? [valid, message] : error;
        }

        
        if(element.validation.required) {
            // true if it's not empty, false otherwise
            const valid = element.value.trim() !== '';

            // if not valid, return a message, else return an empty string
            const message = `${!valid ? 'This field is required' : ''}`;
            // if not valid error returns false with a message, otherwise returns the default state
            error = !valid ? [valid, message] : error;
        }

        return error;
    }


    render() {
        //console.log(this.state);
        return (
            <div className={styles.logContainer}>
                <form>
                    <h2>Register / Login</h2>
                    <FormField
                        formData={this.state.formData.email}
                        id={'email'}
                        change={(element)=>this.updateForm(element)}
                    />
                    <FormField
                        formData={this.state.formData.password}
                        id={'password'}
                        change={(element)=>this.updateForm(element)}
                    />                  
                </form>
            </div>
        )
    }
}


export default SignIn;