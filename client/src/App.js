import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import withContext from './components/Context';

// import components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail'
import CreateCourse from './components/CreateCourse'
import UserSignIn from './components/UserSignIn'
import UserSignUp from './components/UserSignUp'
import UserSignOut from './components/UserSignOut'
import UpdateCourse from './components/UpdateCourse'
import PrivateRoute from './components/PrivateRoute'

// components with context:
const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses)
const UserSignUpWithContext = withContext(UserSignUp)
const UserSignInWithContext = withContext(UserSignIn)
const UserSignOutWithContext = withContext(UserSignOut)
const CreateCourseWithContext = withContext(CreateCourse)
const UpdateCourseWithContext = withContext(UpdateCourse)

export default class App extends Component {
  render(){
    return(
    <Router>
      <HeaderWithContext />

      <Switch>
        <Route exact path="/" component={CoursesWithContext} />
        <PrivateRoute exact path="/courses/create" component={CreateCourseWithContext} />
        <Route exact path="/courses/:id" component= {CourseDetail} />
        <PrivateRoute exact path="/courses/:id/update" component= {UpdateCourseWithContext} />
        <Route exact path="/signin" component= {UserSignInWithContext} />
        <Route exact path="/signup" component= {UserSignUpWithContext} />
        <Route exact path="/signout" component= {UserSignOutWithContext} />
      </Switch>
    </Router>
  )}
};
