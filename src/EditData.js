import React from 'react';
import axios from 'axios';

class EditData extends React.Component{
    constructor(){
        super();

        this.state = {
            fname:"",
            lname:"",
            address:"",
            city:"",
            pincode:"",
            gender:"",

        };

        axios({
            method: 'post',
            url: 'http://localhost:2525/users/login/personalInfo/GetUser',
            data: {
                "_id":localStorage.getItem('EditUser')
            },
        }).then((response)=>{
            console.log(response);

            this.setState({
                fname:response.data.First_Name,
                lname:response.data.Last_Name,
                address:response.data.Address,
                city:response.data.city,
                pincode:response.data.pincode,
                gender:response.data.gender
            });

        }).catch((err)=>{
            console.log(err);
        });
    }
    changeValue = (e)=>{
        let a = e.target.id;

        this.setState({
            [a] : e.target.value
        });
    };

    submit = (e)=>{
        axios({
            method: 'patch',
            url: 'http://localhost:2525/users/login/personalInfo/updateUser',
            data: {
                "_id":localStorage.getItem('EditUser'),
                "First_Name":this.state.fname,
                "Last_Name":this.state.lname,
                "Address":this.state.address,
                "city":this.state.city,
                "pincode":this.state.pincode,
                "gender":this.state.gender
            },

    }).then((response)=>{
            console.log(response);
        }).catch((err)=>{
            console.log(false);
        })
    };

    render(){
        return(
            <section>
                <fieldset>
                    <h1>Personal Information</h1>
                    <div className="col-lg-4">
                        <form onSubmit={(e)=>{e.preventDefault();}} className="form-horizontal" action="" method="post">
                            <div className="form-group">
                                <input className="form-control" type="text" placeholder="FirstName" value={this.state.fname} ref="fname" id="fname" onChange={(e)=>{this.changeValue(e)}}/>
                            </div>
                            <div className="form-group">
                                <input className="form-control" type="text" placeholder="LastName" value={this.state.lname} ref="lname" id="lname" onChange={(e)=>{this.changeValue(e)}} />
                            </div>


                            <div className="form-group">
                                <input  type="radio" ref="radioF" checked={this.state.gender ==='Female'?true:false} name="radioG" value="Female" id="genderF"/>Female
                                <input  type="radio" ref="radioM" checked={this.state.gender ==='Male'?true:false}  name="radioG" value="Male" id="genderM"/>Male
                            </div>
                            <div className="form-group">
                                <label>City</label>
                                <select className="form-control" value={this.state.city} ref="selectcity" id="city" cols="35" width="450">
                                    <option value="Surat">Surat</option>
                                    <option value="Baroda">Baroda</option>
                                    <option value="Anand">Anand</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <textarea className="innput" placeholder="Address" value={this.state.address} ref="txtaddress" id="address" cols="35" width="450" onChange={(e)=>{this.changeValue(e)}} />
                            </div>
                            <div className="form-group">
                                <input className="form-control" type="text" placeholder="PinCode" value={this.state.pincode} ref="txtpincode" id="pincode" onChange={(e)=>{this.changeValue(e)}} />
                            </div>
                            <div>
                                <input className="btn btn-success" type="submit" value="Save"
                                       onClick={(e)=>{
                                           let r='';
                                           if(document.getElementById('genderF').checked)
                                           {
                                               r=document.getElementById('genderF').value;
                                           }
                                           if(document.getElementById('genderM').checked)
                                           {
                                               r=document.getElementById('genderM').value;
                                           }
                                           let c='';
                                           if(document.getElementById('city').checked===true)
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
                                                   city:document.getElementById('city').value,
                                                   address:document.getElementById('address').value,
                                                   pincode:document.getElementById('pincode').value
                                               },
                                               ()=>{

                                                   this.submit(e);
                                               });

                                       }}/>
                            </div>
                        </form>

                    </div>

                </fieldset>


            </section>
        )
    }
}

export default EditData;