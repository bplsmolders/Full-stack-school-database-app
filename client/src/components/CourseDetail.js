import React, {Component} from 'react';
import {Link} from 'react-router-dom'
// import Axios from 'axios';
import ReactMarkdown from 'react-markdown';


export default class CourseDetail extends Component {
    constructor(){
        super()
        this.state = {
            course: [],
            courseUserId: ''
        }
    }

    // On page load the course GET fetched, based on params.id.
    // GET fetch. first checks the respons. If ok, state gets updated. If 404, it redirects to /notfound, on servererror to /error
    componentDidMount(){
        const url = `http://localhost:5000/api/courses/${this.props.match.params.id}`;
        const options = {
            method: 'get',
        }

        fetch(url,options)
        .then( res =>{
            if(res.ok) {
                return res.json()
            } else if (res.status === 404){
                console.log('not found')
                this.props.history.push('/notfound')
            }
        })
        .then(data => 
            this.setState ({
                course: data[0],
                courseUserId: data[0].User.id
            })
        )
        .catch(errors => {
            console.log('Error fetching and parsing data', errors);
            this.props.history.push('/error')
        });   
    }

    // DELETE fetch. First checks the respons. If ok, course gets deleted. 
    // If 404, it redirects to /notfound, on servererror to /error
    delete = (e) => {
        e.preventDefault();
        const name = this.props.context.authenticatedUser.emailAdress
        const password = this.props.context.authenticatedUser.password
        const encodedCredentials = btoa(`${name}:${password}`)

        const url = `http://localhost:5000/api/courses/${this.state.course.id}`;
        const options = {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                "Authorization": `Basic ${encodedCredentials}`
            },
            body: JSON.stringify(this.state)
        }

        fetch(url,options)
        .then( res =>{
            console.log(res)
            if (res.ok){
                this.props.history.push('/')
            }
        })
        .catch(errors => {
            console.log('Error fetching and parsing data', errors);
            this.props.history.push('/error')
        });   
    }



    render() {  
        const course = this.state.course
        const auth = this.props.context.authenticatedUser
        const courseUserId = this.state.courseUserId

        return (
            <main>
                {(this.state.course.length === 0)
                ?   <span></span>
                :   <div className="actions--bar">
                        <div className="wrap">
                            {/* if id of current user matches the userId of the course, the update and delete buttons are shown */}
                            {(auth && auth.userId === courseUserId)
                            ?   
                            <React.Fragment>
                                <Link className="button" to= {`/courses/${course.id}/update`} >Update Course</Link>
                                <button className="button" onClick={this.delete}>Delete Course</button>
                                <Link className="button button-secondary" to='/'>Return to List</Link>
                            </React.Fragment>

                            :   <Link className="button button-secondary" to='/'>Return to List</Link>
                            }
                        </div>
                    </div>
                }

                {/* If course is not loaded yet,l length will be 0 and a loading text is shown */}
                {(this.state.course.length === 0)
                ?   <h2>Loading...</h2>
                :   
                    <form>
                        <div className="main--flex">
                            <div>
                                <h3 className="course--detail--title">Course</h3>
                                <h4 className="course--name">{course.title}</h4>
                                <p>{`By ${course.User.firstName} ${course.User.lastName} `}</p>
                                <ReactMarkdown>{course.description}</ReactMarkdown>
                            </div>
                            <div>
                                <h3 className="course--detail--title">Estimated Time</h3>
                                <p>{course.estimatedTime}</p>

                                <h3 className="course--detail--title">Materials Needed</h3>
                                <ReactMarkdown  children={course.materialsNeeded} />
                            </div>
                        </div>
                    </form>                    
                }
            </main>

    )};
};
