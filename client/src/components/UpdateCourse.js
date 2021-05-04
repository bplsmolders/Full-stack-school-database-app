import React, {Component} from 'react';
import Axios from 'axios'
import axios from 'axios';


export default class UpdateCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course: []
        };
    }

    componentDidMount(){
        Axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
        .then( response => {
            this.setState ({
                course: response.data[0],
            })
        })
        .catch(error => {
            console.log('Error fetching and parsing data', error);
        });    
    }


    handleChange = (e) => {
        let course = this.state.course
        course[e.target.name] = e.target.value
        console.log(course)
        this.setState({course})
    };

    
    handleSubmit = (e) => {
        e.preventDefault()
        const name = 'joe@smith.com'
        const password = 'joepassword'
        const encodedCredentials = btoa(`${name}:${password}`)


        console.log(this.state.course)
        axios.put(`http://localhost:5000/api/courses/${this.props.match.params.id}`, this.state.course, { headers: {"Authorization": `Basic ${encodedCredentials}`}})
            .then(this.props.history.push('/'))
            .catch(error => {
                console.log('Error fetching and parsing data', error);
        });    
    }

    cancel =  (e) => {
        e.preventDefault();
        this.props.history.push('/')
    }

    render(){
        const{
            course
        } = this.state

        return(
            <div className="wrap">
                { (this.state.course.length === 0)
                    ? <h1>Loading...</h1>
                    :
                    <React.Fragment>
                        <h2>Update Course</h2>
                        <form onSubmit={this.handleSubmit}>
                            <div className="main--flex">
                                <div>
                                    <label>Course Title
                                        <input id="courseTitle" name="title" type="text" value={course.title} onChange={this.handleChange}/>
                                    </label>

                                    <p>{`By ${course.User.firstName} ${course.User.lastName}`}</p>

                                    <label>Course Description
                                        <textarea id="courseDescription" name="description" value={course.description} onChange={this.handleChange}/>
                                    </label>
                                </div>
                                <div>
                                    <label>Estimated Time
                                        <input id="estimatedTime" name="estimatedTime" type="text" value={course.estimatedTime} onChange={this.handleChange}/>
                                    </label>
                                    <label>Materials Needed
                                        <textarea id="materialsNeeded" name="materialsNeeded" value={course.materialsNeeded} onChange={this.handleChange}/>
                                    </label>
                                </div>
                            </div>
                            <button className="button" type="submit">Update Course</button><button className="button button-secondary" type='button' onClick={this.cancel}>Cancel</button>
                        </form>
                    </React.Fragment>
                }
            </div>
    )}
}