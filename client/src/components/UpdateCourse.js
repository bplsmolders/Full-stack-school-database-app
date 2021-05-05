import React, {Component} from 'react';
import Axios from 'axios'
import { Redirect } from 'react-router-dom';



export default class UpdateCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course: [],
            errors: [],
            userId: null
        };
    }

    // GET FETCH using AXIOS based on url id.
    componentDidMount(){
        Axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
        .then( response => {
            this.setState ({
                course: response.data[0],
                userId: response.data[0].User.id
            })
        })
        .catch(error => {
            console.log('Error fetching and parsing data', error);
        });    
    }

    // update the course based on form changes
    handleChange = (e) => {
        let course = this.state.course
        course[e.target.name] = e.target.value
        this.setState({course})
    };

    // PUT FETCH.  First checks the respons. If ok, course gets updated. 
    // If 404, it redirects to /notfound, on servererror to /error
    handleSubmit = (e) => {
        e.preventDefault()
        const user = this.props.context.authenticatedUser
        const name = user.emailAdress
        const password = user.password
        const encodedCredentials = btoa(`${name}:${password}`)

        const url = `http://localhost:5000/api/courses/${this.props.match.params.id}`;

        const options = {
            method: 'put',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                "Authorization": `Basic ${encodedCredentials}`
            },
            body: JSON.stringify(this.state.course)
        }

        fetch(url,options)
            .then(res => {
                if (res.ok){
                    this.props.history.push('/')
                } else if(res.status ===404){
                    this.props.history.push('/notfound')  
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
    
    // redirects to home page when cancel button is clicked
    cancel =  (e) => {
        e.preventDefault();
        this.props.history.push('/')
    }

    // when validation Errors are stored. this function makes sure they are displayed on the UI.
    ErrorsDisplay ({ errors })  {
        let errorsDisplay = null;

        if (errors.length) {
        errorsDisplay = (
            <div className="validation--errors">
            <h3>Validation errors</h3>
                <ul>
                {errors.map((error, i) => <li key={i}>{error}</li>)}
                </ul>
            </div>
        );
        }
      
        return errorsDisplay;
    }
      

    render(){
        const{
            course,
            errors,
            userId
        } = this.state
        const authUserId = this.props.context.authenticatedUser.userId
        console.log(authUserId)
        console.log(userId)
        
        return(
            <div className="wrap">
            
                {/* If course is not loaded yet,l length will be 0 and a loading text is shown */}
                { (this.state.course.length === 0)
                    ? <h1>Loading...</h1>
                    :
                    <React.Fragment>

                        {/* if current user does not own this course, the user will be redirected to /forbidden */}
                        {(userId !== authUserId)?
                        <Redirect to='/forbidden' />  : <span />}

                        <h2>Update Course</h2>
                        <this.ErrorsDisplay errors={errors} />
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