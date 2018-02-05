import React from 'react';

import './index.css';
import Modal from 'react-modal'

import Alert from 'react-s-alert'
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import axios from 'axios';



class Header extends React.Component{



    render(){
        return(
            <div>
                <h1>Login</h1>


            </div>
        )
    }
}



class Main extends React.Component{
    constructor(){
        super();

        this.state={
            id:"",
            password:"",
            ModalState:false,
            newusername:"",
            newpassword:""
        }


    }

    componentWillMount(){
        Modal.setAppElement('body');
    }

    toggleChange=()=>{
        this.setState({
            ModalState: !this.state.ModalState

        })
        //alert("asd")
    }

    onIdChange=(e)=>{

        let a = e.target.placeholder;

        this.setState({
            [a] : e.target.value

        })
    };
    /*onpwdChange=(e)=>{
        this.state.txtpwd = e.target.value
        this.setState({
            txtpwd : this.state.txtpwd

        })
    }*/

    register = (e)=>{

        axios.post('http://localhost:2525/users',{
            username:this.state.newusername,
            password:this.state.newpassword
        }).then((response)=>{
            console.log(response);
            console.log(response.data);
            if(response.data){
                this.success(e,'You are now Registered...!!!');

            }
            else
            {
                this.unsuccess(e,'Please Register Again...!!!');
            }
        }).catch((err)=>{
            this.unsuccess(e,'Please Register Again...!!!');
        })
    };

    submit = (e)=>{

        axios({
            method: 'post',
            url: 'http://localhost:2525/users/login',
            data: {
                "username":this.state.id,
                "password":this.state.password
            },
            crossDomain : true,
            withCredentials: true
        }).then((response)=>{
            console.log(`response:`,response);
            if(response.data){

                localStorage.setItem('abc123',JSON.stringify(response.data));
                //this.success(e,'Login Successful');
                this.props.history.push('/login_success');
            }
            else
            {
                this.unsuccess(e,'Login Unsuccessful');
            }
        }).catch((e)=>{
            console.log(e);
        });

        /*if(this.state.id === "admin" && this.state.password === "admin")
        {
            //alert("Login Successfull")
            this.handleClick1(e);
        }
        else
        {
            //alert("Login UnSuccessFull")
            this.handleClick2(e);
        }*/
    };


    unsuccess(e,msg){
        e.preventDefault();
        Alert.error(msg,{
            position:'top-right',
            effect:'bouncyflip',
            beep:true,
            timeout:500,
            offset:100
        })
    }



    success(e,msg) {
        e.preventDefault();
        Alert.success(msg, {
            position: 'top-right',
            effect: 'scale',
            beep: true,
            timeout: 500,
            offset: 100
        });
    }

    sampleFunction=()=>{
        this.toggleChange();
    };

    render(){
        return(

            <div style={{textAlign:"center"}}>
                <div className="dv">
                    <Header ck={this.toggleChange} />

                    <input type="text" placeholder="id" onChange={(e)=>{
                        this.onIdChange(e)
                    }}/><br/>
                    <input type="text" placeholder="password" onChange={(e)=>{
                        this.onIdChange(e)
                    }}/>
                    <br/>
                    <button onClick={this.submit} disabled={this.state.id ? this.state.password ? false : true : true } >Login</button>
                    <button onClick={()=>{

                        this.sampleFunction();
                    }}>Register</button>
                </div>
                <Modal isOpen={this.state.ModalState} onRequestClose={this.toggleChange}>
                    <h1>Register Here..!!</h1>
                    <button onClick={this.toggleChange} style={{position:"absolute" , top:"0px" , right:"0px"}}>Close</button>
                    <div>
                        <input id="newid" type="text" placeholder="newusername" onChange={(e)=>{this.onIdChange(e)}}/><br/>
                        <input id="newpassword" type="password" placeholder="newpassword" onChange={(e)=>{this.onIdChange(e)}}/><br/>
                        <button onClick={this.register}>Register</button>
                    </div>

                </Modal>
                <div>

                </div>
                <Alert stack={{limit: 3}} html={true} />
            </div>
        )
    }
}
export default Main

