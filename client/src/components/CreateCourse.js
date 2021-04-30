import React, {Component} from 'react';
import Axios from 'axios';


export default class CreateCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            estimatedTime: '',
            materialsNeeded: ''
        };
    }
    
    handleSubmit(){
        Axios.post('http://localhost:5000/api/courses', {
            title: this.state.title,
            description: this.state.description,
            estimatedTime: this.state.estimatedTime,
            materailsNeeded: this.state.materailsNeeded,
        })
        .then(res => {
            console.log(res)
        })
        .catch(error => {
            console.log('Error fetching and parsing data', error);
        });    
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
                <div className="validation--errors">
                    <h3>Validation Errors</h3>
                    <ul>
                        <li>Please provide a value for "Title"</li>
                        <li>Please provide a value for "Description"</li>
                    </ul>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label>Course Title
                                <input id="courseTitle" name="courseTitle" type="text"></input>
                            </label>

                            <p>By Joe Smith</p>

                            <label>Course Description
                                <textarea id="courseDescription" name="courseDescription"></textarea>
                            </label>
                        </div>
                        <div>
                            <label>Estimated Time
                                <input id="estimatedTime" name="estimatedTime" type="text"></input>
                            </label>

                            <label>Materials Needed
                                <textarea id="materialsNeeded" name="materialsNeeded"></textarea>
                            </label>
                        </div>
                    </div>
                    <button className="button" type="submit">Create Course</button>
                    <button className="button button-secondary" href='/'>Cancel</button>
                </form>
            </div>
        )
    }
}

