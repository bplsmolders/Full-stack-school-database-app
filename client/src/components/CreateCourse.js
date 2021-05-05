import React, {Component} from 'react';
// import axios from 'axios';


export default class CreateCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            estimatedTime: '',
            materialsNeeded: '',
            userId: props.context.authenticatedUser.userId,
            errors: []
        };
    }

    // This function handels the form changes and updates state
    handleChange= (e) => {
        this.setState({ [e.target.name]: e.target.value})
    }
    
    // POST fetch. first checks the respons. If ok, course gets created and UI redirects to main page. 
    // When the send data is incomplete, validation errors gets stored in state 
    // on servererror it redirects to /error
    handleSubmit = (e) => {
        e.preventDefault();
        const user = this.props.context.authenticatedUser
        const name = user.emailAdress
        const password = user.password
        const encodedCredentials = btoa(`${name}:${password}`)

        const url = `http://localhost:5000/api/courses`;

        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                "Authorization": `Basic ${encodedCredentials}`
            },
            body: JSON.stringify(this.state)
        }


        fetch(url,options)
        .then(res => {
            if (res.ok){
                this.props.history.push('/')
            } else {
                return res.json()
            }
        })
        .then(errors => {
            if(errors){
                this.setState({errors: errors.errors})
            }
        })
        .catch(errors => {
            console.log('Error fetching and parsing data', errors);
            this.props.history.push('/error')
        });   
    }
    
    //When Cancel buttun is clicked this function redirects the user to the home page
    cancel =  (e) => {
        e.preventDefault();
        this.props.history.push('/')
    }

    // when validation Errors are stored. this function makes sure they are displayed on the UI.
    ErrorsDisplay({ errors }) {
        let errorsDisplay = null;
    
        if (errors.length) {
        errorsDisplay = (
            <div className="validation--errors">
            <h3>Validation errors</h3>
                <ul>
                {errors.map((error, i) => <li key={i}>{error}</li>)}
                </ul>
            </div>
        );}
    
        return errorsDisplay;
    }


    render(){
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            errors
        } = this.state;

        let user = this.props.context.authenticatedUser

        return(
            <div className="wrap">
                <h2>Create Course</h2>
                <this.ErrorsDisplay errors={errors} />
               
                <form onSubmit={this.handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label>Course Title
                                <input id="title" name="title" type="text" value={title} onChange={this.handleChange} />
                            </label>

                            <p>{`By ${user.firstName} ${user.lastName} ` }</p>

                            <label>Course Description
                                <textarea id="description" name="description" value={description} onChange={this.handleChange} />
                            </label>
                        </div>
                        <div>
                            <label>Estimated Time
                                <input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime} onChange={this.handleChange} />
                            </label>

                            <label>Materials Needed
                                <textarea id="materialsNeeded" name="materialsNeeded" value={materialsNeeded} onChange={this.handleChange}/>
                            </label>
                        </div>
                    </div>
                    <button className="button" type="submit">Create Course</button>
                    <button className="button button-secondary" onClick={this.cancel}>Cancel</button>
                </form>
            </div>
        )
    }
}

