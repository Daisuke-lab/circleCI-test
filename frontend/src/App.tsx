// import logo from './logo.svg';
import './App.css';
import React from 'react'
import Navbar from './Navbar'
import Home from './Authentication/Home'
import ChooseRoom from './Main/ChooseRoom'
import Rooms from './Main/Rooms'
import MakeRoom from './Main/MakeRoom'
import AddFriend from './Main/AddFriend'
import Discussion from './Discussion/Discussion'
import Test from './Authentication/Test'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/choose_room' component={ChooseRoom} />
            <Route exact path='/rooms' component={Rooms} />
            <Route exact path='/make_room' component={MakeRoom} />
            <Route exact path='/add_friend' component={AddFriend} />
            <Route exact path='/discussion' component={Discussion} />
            <Route exact path='/test' component={Test} />
      </Switch>
    </Router>
  );
}
