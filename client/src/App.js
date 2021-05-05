import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import withContext from './components/Context';

// import all the components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail'
import CreateCourse from './components/CreateCourse'
import UserSignIn from './components/UserSignIn'
import UserSignUp from './components/UserSignUp'
import UserSignOut from './components/UserSignOut'
import UpdateCourse from './components/UpdateCourse'
import PrivateRoute from './components/PrivateRoute'
import NotFound from './components/NotFound'
import Forbidden from './components/Forbidden'
import UnhandledError from './components/UnhandledError'


// components wrapped in WithContext, so user authentication is gloabally available
const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses)
const UserSignUpWithContext = withContext(UserSignUp)
const UserSignInWithContext = withContext(UserSignIn)
const UserSignOutWithContext = withContext(UserSignOut)
const CreateCourseWithContext = withContext(CreateCourse)
const UpdateCourseWithContext = withContext(UpdateCourse)
const CouseDetailWithContext = withContext(CourseDetail)

// PrivateRoutes are only available when logged in.
// When no path matches, component NotFound is rendered.
// Components ending with "WithContext" have acces to the global Context
export default class App extends Component {
  render(){
    return(
    <Router>
      <HeaderWithContext />

      <Switch>
        <Route exact path="/" component={CoursesWithContext} />
        <PrivateRoute exact path="/courses/create" component={CreateCourseWithContext} />
        <Route exact path="/courses/:id" component= {CouseDetailWithContext} />
        <PrivateRoute exact path="/courses/:id/update" component= {UpdateCourseWithContext} />
        <Route exact path="/signin" component= {UserSignInWithContext} />
        <Route exact path="/signup" component= {UserSignUpWithContext} />
        <Route exact path="/signout" component= {UserSignOutWithContext} />
        <Route exact path="/notfound" component= {NotFound} />
        <Route exact path="/forbidden" component= {Forbidden} />
        <Route exact path="/error" component= {UnhandledError} />
        <Route component= {NotFound} />
      </Switch>
    </Router>
  )}
};
