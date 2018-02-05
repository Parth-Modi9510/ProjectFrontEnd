import React from 'react'
import axios from 'axios'
import Alert from 'react-s-alert'
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';


class Logins extends React.Component{
    constructor(){
        super();

        this.state = {
            fname:"",
            lname:"",
            address:"",
            city:"",
            pincode:"",
            gender:"",


        }

    }

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

    submit=(e)=>{

        axios({
            method: 'post',
            url: 'http://localhost:2525/users/login/personalInfo',
            data: {
                "First_Name":this.state.fname,
                "Last_Name":this.state.lname,
                "Address":this.state.address,
                "city":this.state.city,
                "pincode":this.state.pincode,
                "gender":this.state.gender
            },
            crossDomain : true,
            withCredentials: true
        }).then((response)=>{
            console.log(`response:`,response);
            if(response.data){

                localStorage.setItem('abc123',JSON.stringify(response.data));
                this.success(e,'Data Inserted...');
                //this.props.history.push('/login_success');
            }
            else
            {
                this.unsuccess(e,'Data Not inserted...');
            }
        }).catch((e)=>{
            console.log(e);
        });
    };

    render(){
        return(
            <section>

                <fieldset>
                    <h1>Personal Information</h1>
                    <div className="col-lg-4">
                        <form onSubmit={(e)=>{e.preventDefault();}} className="form-horizontal" action="" method="post">
                            <div className="form-group">
                                <input className="form-control" type="text" placeholder="FirstName" ref="fname" id="fname"/>
                            </div>
                            <div className="form-group">
                                <input className="form-control" type="text" placeholder="LastName" ref="lname" id="lname"/>
                            </div>


                            <div className="form-group">
                                <input  type="radio" ref="radioF" name="radioG" value="Female" id="txtradioF"/>Female
                                <input  type="radio" ref="radioM" name="radioG" value="Male" id="txtradioM"/>Male
                            </div>
                            <div className="form-group">
                                <label>City</label>
                                <select className="form-control" ref="selectcity" id="selectcity" cols="35" width="450">
                                    <option value="Surat">Surat</option>
                                    <option value="Baroda">Baroda</option>
                                    <option value="Anand">Anand</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <textarea className="innput" placeholder="Address" ref="txtaddress" id="txtaddress" cols="35" width="450" />
                            </div>
                            <div className="form-group">
                                <input className="form-control" type="text" placeholder="PinCode" ref="txtpincode" id="txtpincode"/>
                            </div>
                            <div>
                                <input className="btn btn-success" type="submit" value="Save"
                                       onClick={(e)=>{
                                           let r='';
                                           if(document.getElementById('txtradioF').checked)
                                           {
                                               r=document.getElementById('txtradioF').value;
                                           }
                                           if(document.getElementById('txtradioM').checked)
                                           {
                                               r=document.getElementById('txtradioM').value;
                                           }
                                           let c='';
                                           if(document.getElementById('selectcity').checked===true)
                                           {
                                               c='Y';
                                           }
                                           else
                                           {
                                               c='N';
                                           }
                                           this.setState({
                                                   fname:document.getElementById('fname').value,
                                                   lname:document.getElementById('lname').value,
                                                   gender:r,
                                                   city:document.getElementById('selectcity').value,
                                                   address:document.getElementById('txtaddress').value,
                                                    pincode:document.getElementById('txtpincode').value
                                               },
                                               ()=>{

                                                   this.submit(e);
                                               });
                                       }}/>
                            </div>
                        </form>
                        <Alert stack={{limit: 3}} html={true} />
                    </div>

                </fieldset>


            </section>
        )
    }
}
export default Logins;