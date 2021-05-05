import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import Axios from 'axios';


export default class Courses extends Component {
    constructor(){
        super()
        this.state = {
            courses: []
        }
    }

    // On page load all courses GET fetched
    // GET fetch. first checks the respons. If ok, state gets updated. On servererror to /error
    componentDidMount(){
        Axios.get('http://localhost:5000/api/courses')
        .then( response => {
            this.setState ({
                courses: response.data
            })
        })
        .catch(errors => {
            console.log('Error fetching and parsing data', errors);
            this.props.history.push('/error')
        });    
    }


    render() {  
        return (
            <div className="wrap main--grid">
                {/* If course is not loaded yet,l length will be 0 and a loading text is shown. Next it will render a elements for each course using the map method */}
                {(this.state.courses.length === 0)
                ? <h2>Loading...</h2>
                :   this.state.courses.map(course =>
                    <Link key={course.id} className="course--module course--link" to={`/courses/${course.id}`}>
                        <h2 className="course--label">Course</h2>
                        <h3 className="course--title">{course.title}</h3>
                    </Link>
                )}
                <Link className="course--module course--add--module" to="/courses/create">
                    <span className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                        New Course
                    </span>
                </Link>
            </div>
        )
    };
};
  