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
        newFormData[element.id] = newElement;
        //console.log('Previous state:',newFormData);
        //console.log('NewElement value:',newElement.value);
        
        this.setState({
            formData: newFormData
        })
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