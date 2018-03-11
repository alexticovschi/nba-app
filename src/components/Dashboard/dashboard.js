import React, { Component } from 'react';
import FormField from '../widgets/FormFields/formFields';
import styles from './dashboard.css';
import { firebaseTeams } from '../../firebase';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw,convertToRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

class Dashboard extends Component {

    state = {
        editorState: EditorState.createEmpty(),
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
            body: {
                element: 'texteditor',
                value: '',
                valid: true
            },
            teams: {
                element: 'select',
                value: '',
                config: {
                    name: 'teams_input',
                    options: []
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            }
        }
    }

    // after the dashboard component is rendered, trigger the loadTeams function
    componentDidMount() {
        this.loadTeams(); 
    }

    loadTeams = () => {
        firebaseTeams.once('value').then((snapshot) => {
            let teams = [];
            
            snapshot.forEach((childSnapshot)=>{
                teams.push({
                    id:   childSnapshot.val().teamId,
                    name: childSnapshot.val().city
                })
            })
            //console.log('Teams:',teams);

            // make a copy of the current state
            const newFormData = {...this.state.formData}
            
            // the id of the element that we want to change
            const newElement = {...newFormData['teams']};
            
            // inject new data into options
            newElement.config.options = teams;

            // grab the newFormData, access teams and assign whatever is inside newElement
            newFormData['teams'] = newElement;
            //console.log(newFormData);

            // update the state with new data
            this.setState({
                formData: newFormData
            })
            console.log('Updated state:', this.state.formData)
        })
    }


    updateForm = (element, content='') => {
        // create a clone of the previous state
        const newFormData = {
            ...this.state.formData
        }
        // create new element with ids
        const newElement = {
            ...newFormData[element.id]
        }

        if(content === '') {
            // assign new value to the element
            newElement.value = element.event.target.value;
        } else {
            newElement.value = content;
        }

        
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

    onEditorStateChange = (editorState) => {
        let contentState = editorState.getCurrentContent();
        let rawState = convertToRaw(contentState);

        let html = stateToHTML(contentState);
        
        this.updateForm({id:'body'}, html) 

        this.setState({
            editorState
        })
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

                        <Editor 
                            editorState={this.state.editorState}
                            wrapperClassName="myEditor-wrapper"
                            editorClassName="myEditor-editor"
                            onEditorStateChange={this.onEditorStateChange}
                        />

                        <FormField
                            id={'teams'}
                            formData={this.state.formData.teams}
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