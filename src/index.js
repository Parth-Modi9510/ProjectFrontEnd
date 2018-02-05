import React from 'react'
import ReactDOM from 'react-dom'
import Main from './login'
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Logins from './login_success';
import Display from './display';
import EditData from './EditData';


class First extends React.Component{
    constructor(){
        super();
        this.state = {
            eid:""
        };
    }
    render(){
        return(
            <div>

            </div>
        )
    }
}

ReactDOM.render(

    <div>
    <First />
        <BrowserRouter>
            <switch>
                <Route exact path="/" component={Main}/>
                <Route exact path="/login_success" component={Logins}/>
                <Route exact path="/display" component={Display}/>
                <Route exact path="/Editdata" component={EditData}/>
            </switch>
        </BrowserRouter>

    </div>

    , document.getElementById('root'));
