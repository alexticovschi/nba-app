import React, { Component } from 'react';
import FormField from '../widgets/FormFields/formFields';
import styles from './dashboard.css';


class Dashboard extends Component {

    state = {
        postError: '',
        loading: false,
        formData: {
            author: {
                element: 'input',
                value: '',
                config: {
                    name: 'author_input',
                    type: 'text',
                    placeholder: 'Enter Your Name'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            title: {
                element: 'input',
                value: '',
                config: {
                    name: 'title_input',
                    type: 'text',
                    placeholder: 'Enter the Title'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
        }
    }

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = {}; 
        let formIsValid = true;

        // On each iteration enter the data to submit by creating a key 
        // ...and passing the value of the key 
        for(let key in this.state.formData) {
            dataToSubmit[key] = this.state.formData[key].value;
        }
        // If all the elements are valid, formIsValid keeps its default value,
        // ... else change the value to false
        for(let key in this.state.formData) {
            formIsValid = this.state.formData[key].valid && formIsValid;
        }

        console.log(dataToSubmit);

        if(formIsValid) {
            console.log('Submit post');
        } else {
            this.setState({
                postError: '* Something went Wrong! Post was NOT submitted *'
            })
        }

    }

    updateForm = (element) => {
        // create a clone of the previous state
        const newFormData = {
            ...this.state.formData
        }
        // create new element with ids
        const newElement = {
            ...newFormData[element.id]
        }
        // assign new value to the element
        newElement.value = element.event.target.value;
        if(element.blur) {
            let validData = this.validate(newElement);
            // console.log('validData', validData);
            newElement.valid = validData[0]; // newElement.value equals the first value of the array; true or false
            newElement.validationMessage = validData[1]; // validationMessage will contain a message
        }

        newElement.touched = element.blur; // true or false
        newFormData[element.id] = newElement;

        this.setState({
            formData: newFormData
        })
    }

    validate = (element) => {
        // if the error variable contains true and empty string, the input is valid
        let error = [true, ''];
        
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

    submitButton = () => (
        this.state.loading ?
            'Loading...'
        :
        <div>
            <button type="submit">Add Post</button>
        </div>    
    )

    showError = () => (
        this.state.postError !== '' ?
            <div className={styles.error}>
                {this.state.postError}
            </div>
        : null
    )

    render() {
        return (
            <div className={styles.outer}>
                <div className={styles.postContainer}>
                    <form onSubmit={this.submitForm}>
                        <h2>Add Post</h2>
                        
                        <FormField
                            id={'author'}
                            formData={this.state.formData.author}
                            change={(element)=>this.updateForm(element)}
                        />      

                        <FormField
                            id={'title'}
                            formData={this.state.formData.title}
                            change={(element)=>this.updateForm(element)}
                        /> 

                        { this.submitButton() }     
                        { this.showError() }         
                    </form>
                </div>
            </div>
        )
    }

}


export default Dashboard;