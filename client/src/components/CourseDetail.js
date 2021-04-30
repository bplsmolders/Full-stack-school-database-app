import React, {Component} from 'react';
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
                            <a className="button" href= {`/courses/${course.id}/update`} >Update Course</a>
                            <a className="button" href={`/courses/${course.id}/delete`}>Delete Course</a>
                            <a className="button button-secondary" href="/">Return to List</a>
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
                                {course.description.split(/\n/).map(des => 
                                    <p key={des}>{des}</p>
                                )}

                            </div>
                            <div>
                                <h3 className="course--detail--title">Estimated Time</h3>
                                <p>{course.estimatedTime}</p>

                                <h3 className="course--detail--title">Materials Needed</h3>
                                <ul className="course--detail--list">
                                    {(course.materialsNeeded)
                                    ? course.materialsNeeded.split('* ').map(material => 
                                        <li key={material}>{material}</li>)
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
