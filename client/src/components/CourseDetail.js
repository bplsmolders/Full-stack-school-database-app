import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import Axios from 'axios';


export default class CourseDetail extends Component {
    constructor(){
        super()
        this.state = {
            course: [],
        }
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


    render() {  
        const course = this.state.course

        return (
            <main>
                {(this.state.course.length === 0)
                ?   <span></span>
                :   <div className="actions--bar">
                        <div className="wrap">
                            <Link className="button" to= {`/courses/${course.id}/update`} >Update Course</Link>
                            <Link className="button" to={`/`}>Delete Course</Link>
                            <Link className="button button-secondary" to="/">Return to List</Link>
                        </div>
                    </div>
                }

                {(this.state.course.length === 0)
                ?   <h2>Course not found...</h2>
                :   
                    <form>
                        <div className="main--flex">
                            <div>
                                <h3 className="course--detail--title">Course</h3>
                                <h4 className="course--name">{course.title}</h4>
                                <p>{`By ${course.User.firstName} ${course.User.lastName} `}</p>
                                {course.description.split(/\n/).map((des, index) => 
                                    <p key={index}>{des}</p>
                                )}
                            </div>
                            <div>
                                <h3 className="course--detail--title">Estimated Time</h3>
                                <p>{course.estimatedTime}</p>

                                <h3 className="course--detail--title">Materials Needed</h3>
                                <ul className="course--detail--list">
                                    {(course.materialsNeeded)
                                    ? course.materialsNeeded.split('* ').map((material, index) => 
                                        <li key={index}>{material}</li>)
                                    :   <li>No Materials Needed</li>
                                    }
                                </ul>
                            </div>
                        </div>
                    </form>                    
                }
            </main>

    )};
};
