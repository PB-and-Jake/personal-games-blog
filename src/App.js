import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {Dropdown} from 'react-bootstrap';

import TopNavbar from "./components/topnavbar.component";
import ReviewsList from "./components/reviews-list.component";
import EditReview from "./components/edit-review.component";
import CreateReview from "./components/create-review.component";
import CreateUser from "./components/create-user.component";
import PlatformsList from "./components/platforms-list.component";
import CreatePlatform from './components/create-platform.component';
import ViewReview from './components/view-review.component';

function App() {
  var containerStyle={
    height:'100vh',
    width:'100vw'
  }
  return (
      <Router style={{backgroundColor:'#afafaf'}}>
        <div className="container" style={containerStyle}>
          <TopNavbar />
          <br/>
          <Route path="/" exact component={ReviewsList} />
          <Route path="/edit/:id" component={EditReview}/>
          <Route path="/create" component={CreateReview}/>
          <Route path="/user" component={CreateUser}/>
          <Route path="/platforms" component={PlatformsList}/>
          <Route path="/createPlatform" component={CreatePlatform}/>
          <Route path="/viewReview/:id" component={ViewReview}/>
        </div>
    </Router>
  );
}

export default App;