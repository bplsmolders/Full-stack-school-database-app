import React, {Component} from 'react';
import axios from 'axios';


export default class CreateCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            estimatedTime: '',
            materialsNeeded: '',
            userId: 1
        };
    }

    handleChange= (e) => {
        this.setState({ [e.target.name]: e.target.value})
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)
        const name = 'joe@smith.com'
        const password = 'joepassword'
        const encodedCredentials = btoa(`${name}:${password}`)

        axios.post('http://localhost:5000/api/courses', this.state, { headers: {"Authorization": `Basic ${encodedCredentials}`}})
            .then(this.props.history.push('/'))
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });    
    }
    
    cancel =  (e) => {
        e.preventDefault();
        this.props.history.push('/')
    }

    ErrorsDisplay({ errors }) {
        let errorsDisplay = null;
    
        if (errors.length) {
        errorsDisplay = (
            <div>
            <h2 className="validation--errors--label">Validation errors</h2>
            <div className="validation-errors">
                <ul>
                {errors.map((error, i) => <li key={i}>{error}</li>)}
                </ul>
            </div>
            </div>
        );
        }
    
        return errorsDisplay;
    }


    render(){
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded
        } = this.state;

        return(
            <div className="wrap">
                <h2>Create Course</h2>
                {/* <div className="validation--errors">
                    <h3>Validation Errors</h3>
                    <ul>
                        <li>Please provide a value for "Title"</li>
                        <li>Please provide a value for "Description"</li>
                    </ul>
                </div> */}
                <form onSubmit={this.handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label>Course Title
                                <input id="title" name="title" type="text" value={title} onChange={this.handleChange} />
                            </label>

                            <p>By Joe Smith</p>

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

