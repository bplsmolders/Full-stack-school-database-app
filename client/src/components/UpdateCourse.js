import React, {Component} from 'react';
import Axios from 'axios'


export default class UpdateCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course: [],
            formValues: {}
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


    handleChange(event) {
        event.preventDefault();
        let formValues = this.state.formValues
        let name= event.target.name
        let value= event.target.value
        formValues[name] = value

        return this.setState({formValues})
    }
    
    handleSubmit(data){
        Axios({
            method: "put",
            url: `http://localhost:5000/api/courses/${this.props.match.params.id}`,
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
        console.log(this.props.match.params.id)
        const course = this.state.course
        return(
            <div className="wrap">
                { (this.state.course.length === 0)
                    ? <h1>Loading...</h1>
                    :
                    <React.Fragment>
                        <h2>Update Course</h2>
                        <form onSubmit={this.handleSubmit(this.state.formvalues)}>
                            <div className="main--flex">
                                <div>
                                    <label>Course Title
                                        <input id="courseTitle" name="courseTitle" type="text" value={course.title} onChange={this.handleChange.bind(this)}/>
                                    </label>

                                    <p>{`By ${course.User.firstName} ${course.User.lastName}`}</p>

                                    <label>Course Description
                                        <textarea id="courseDescription" name="courseDescription" value={course.description} onChange={this.handleChange.bind(this)}/>
                                    </label>
                                </div>
                                <div>
                                    <label>Estimated Time
                                        <input id="estimatedTime" name="estimatedTime" type="text" value={course.estimatedTime} onChange={this.handleChange.bind(this)}/>
                                    </label>
                                    <label>Materials Needed
                                        <textarea id="materialsNeeded" name="materialsNeeded" value={course.materialsNeeded} onChange={this.handleChange.bind(this)}/>
                                    </label>
                                </div>
                            </div>
                            <button className="button" type="submit">Update Course</button><button class="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button>
                        </form>
                    </React.Fragment>
                }
            </div>
    )}
}