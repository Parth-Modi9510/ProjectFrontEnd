import React from 'react';
import ReactDOM from 'react-dom';
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

    sampleFunction=()=>{
        this.props.ck();
    }

    render(){
        return(
            <div>
                <h1>This is Header</h1>
                <button>Login</button>
                <button onClick={()=>{
                    this.sampleFunction()
                }}>Register</button>
                <button>About Us</button>



            </div>
        )
    }
}
class Footer extends React.Component{
    render(){
        return(
            <h5 style={{textAlign:"center"}}>This website is created by P.M</h5>
        )
    }
}

class Main extends React.Component{
    constructor(){
        super();

        this.state={
            id:"",
            password:"",
            ModalState:false
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
    }
    /*onpwdChange=(e)=>{
        this.state.txtpwd = e.target.value
        this.setState({
            txtpwd : this.state.txtpwd

        })
    }*/
    submit = (e)=>{

        axios.post('http://localhost:2525/users/login',{
            username:this.state.id,
            password:this.state.password
        }).then((response)=>{
            console.log(response);
            if(response.data){
                this.success(e);
            }
            else
            {
                this.unsuccess(e);
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


    unsuccess(e){
        e.preventDefault();
        Alert.error('Login UnSuccessfull..!!',{
            position:'top-right',
            effect:'bouncyflip',
            beep:true,
            timeout:500,
            offset:100
        })
    }



    success(e) {
        e.preventDefault();
        Alert.success('Login Successfull..!!', {
            position: 'top-right',
            effect: 'scale',
            beep: true,
            timeout: 500,
            offset: 100
        });
    }



    render(){
        return(

            <div style={{textAlign:"center"}}>



                <Header ck={this.toggleChange} />

                <input type="text" placeholder="id" onChange={(e)=>{
                    this.onIdChange(e)
                }}></input><br/>
                <input type="text" placeholder="password" onChange={(e)=>{
                    this.onIdChange(e)
                }}></input>
                <br/>
                <button onClick={this.submit} disabled={this.state.id ? this.state.password ? false : true : true } >Login</button>

                <Modal isOpen={this.state.ModalState} onRequestClose={this.toggleChange}>
                    <h1>Register Here..!!</h1>
                    <button onClick={this.toggleChange} style={{position:"absolute" , top:"0px" , right:"0px"}}>Close</button>
                </Modal>

                <Alert stack={{limit: 3}} html={true} />
            </div>
        )
    }
}
ReactDOM.render(<div><Main /><Footer /></div>, document.getElementById('root'))

