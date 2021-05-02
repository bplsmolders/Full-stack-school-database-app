import React, {Component} from 'react';
import axios from 'axios';


export default class CreateCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formValues: {}
        };
    }

    handleChange(event) {
        event.preventDefault();
        let formValues = this.state.formValues
        let name= event.target.name
        let value= event.target.value
        formValues[name] = value

        return this.setState({formValues})
    }
    
    handleSubmit(data){
        axios({
            method: "post",
            url: 'http://localhost:5000/api/courses',
            data: data, 
            headers: {"Content-Type": "multipart/form-data"}
        })
        .then(res => {
            console.log(res)
        })
        .catch(error => {
            console.log('Error fetching and parsing data', error);
        });    
    }

    render(){
        // const {
        //     title,
        //     description,
        //     estimatedTime,
        //     materialsNeeded
        // } = this.state;

        // console.log(this.state.formValues)

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
                <form onSubmit={this.handleSubmit(this.state.formValues)}>
                    <div className="main--flex">
                        <div>
                            <label>Course Title
                                <input id="title" name="title" type="text" value={this.state.formValues['title']} onChange={this.handleChange.bind(this)} />
                            </label>

                            <p>By Joe Smith</p>

                            <label>Course Description
                                <textarea id="description" name="description" value={this.state.formValues['description']} onChange={this.handleChange.bind(this)} />
                            </label>
                        </div>
                        <div>
                            <label>Estimated Time
                                <input id="estimatedTime" name="estimatedTime" type="text" value={this.state.formValues['estimatedTime']} onChange={this.handleChange.bind(this)} />
                            </label>

                            <label>Materials Needed
                                <textarea id="materialsNeeded" name="materialsNeeded" value={this.state.formValues['materialsNeeded']} onChange={this.handleChange.bind(this)}/>
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

