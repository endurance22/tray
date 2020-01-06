import React from 'react';
import logo from './logo.svg';
import './App.css';
import Register from './views/register/index'
import Login from './views/login/index'
import Home from './views/home/index'
import Styles from './main.module.css'
import CreateGroup from './views/groups/createGroup/index'
import JoinGroup from './views/groups/joinGroup/index'
var axios  = require('axios');



class App extends React.Component{
    constructor(){
      super();
      this.state = {
        loggedIn:0,
        username:'',
        userId:'',
        groupcode:''

      }
      this.updateOnLogin = this.updateOnLogin.bind(this);
    }
  componentDidMount = ()=>{
    let user  = JSON.parse(localStorage.getItem('user'));

    if(user){
      this.setState(
        {
          loggedIn:1,
          username:user.username,
          userId:user.userId
        

      }

      )
    }
    
  }
  logout = ()=>{
    this.setState({
      loggedIn:0,
      username:'',
      userId:''
    })
    localStorage.removeItem('user');
    localStorage.removeItem('groups');
    // localStorage.setItem('group',JSON.stringify(group));
  }
  updateOnLogin = (value)=>{
    console.log("logged in")
    // this.render();
    this.setState({
      loggedIn:1

    })
  }
  setGroupCode = (value)=>{
   
    let group = {
      groupcode:value
    }

   let groups  = [];
   groups.push(group);
    localStorage.setItem('groups',JSON.stringify(...groups));


    this.setState({
      groupcode:value

    })
  }

  render(){
    console.log(this.state.groupcode)
    return (
      <div className="App">

          {/* { (this.state.loggedIn) ?( <button className={Styles.button} onClick={this.logout}> LOGOUT</button> ): ''} */}
          {/* {(this.state.loggedIn) ?  (<Home username = {this.state.username }></Home>) : (<Login  isLoggedIn = {this.updateOnLogin} ></Login>)} */}






          <switch>
            <Route path="/">

          { (this.state.loggedIn) ?( <button className={Styles.button} onClick={this.logout}> LOGOUT</button> ): ''}
          {(this.state.loggedIn) ?  (<Home username = {this.state.username }></Home>) : (<Login  isLoggedIn = {this.updateOnLogin} ></Login>)}

            </Route>
            <Route path="/createGroup">
              {<CreateGroup   setGroupCode = {this.setGroupCode}></CreateGroup>}
              { (this.state.groupcode)?(<div>YOUR GROUP CODE IS : {this.state.groupcode}</div>):''}
            </Route>
            <Route path="/joinGroup">
              {<JoinGroup userId ={this.state.userId} ></JoinGroup>}

            </Route>
          </switch>

      </div>
   )
    }
}

export default App;