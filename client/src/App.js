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

// components with context:
const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses)

export default class App extends Component {
  render(){
    return(
    <Router>
      <HeaderWithContext />

      <Switch>
        <Route exact path="/" component={CoursesWithContext} />
        <Route exact path="/courses/create" component={CreateCourse} />
        <Route exact path="/courses/:id" component= {CourseDetail} />
        <Route exact path="/courses/:id/update" component= {UpdateCourse} />
        <Route exact path="/signin" component= {UserSignIn} />
        <Route exact path="/signup" component= {UserSignUp} />
        <Route exact path="/signout" component= {UserSignOut} />
      </Switch>
    </Router>
  )}
};
