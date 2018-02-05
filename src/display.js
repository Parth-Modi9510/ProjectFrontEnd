import React from 'react';
import axios from 'axios';


class Display extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            isEditing:false
        };
        axios.get('http://localhost:2525/users/login/personalInfo').then((response)=>{
            this.setState({
                data:response.data
            });
        }).catch((err)=>{
            console.log(err);
        });
    };
    deleteData = (id)=>{

      axios.delete(`http://localhost:2525/users/login/personalInfo/${id}`).then((response)=>{

     console.log(response);
      }).catch((err)=>{
          console.log(err);
      })
    };

    EditData=(id)=>{
        //console.log(id);
        localStorage.setItem('EditUser',id);
        this.props.history.push('/EditData');
    };

    render(){
        return(

            <div>

                <table border="2">
                    <tr>
                        <th colspan="8" align="center">Personal Information about Users</th>
                    </tr>
                    <tr>
                        <td>FirstName</td>
                        <td>LastName</td>
                        <td>Gender</td>
                        <td>City</td>
                        <td>Address</td>
                        <td colspan="3">PinCode</td>

                    </tr>
                    {
                        this.state.data.map((doc,index)=>{
                            return <tr>
                                <td onDoubleClick={(e)=>{this.toggle(e)}}>{doc.First_Name}</td>
                                <td>{doc.Last_Name}</td>
                                <td>{doc.gender}</td>
                                <td>{doc.city}</td>
                                <td>{doc.Address}</td>
                                <td>{doc.pincode}</td>
                                <td>
                                    <a onClick={()=>{
                                        let edit_id = doc._id;

                                        this.EditData(edit_id);
                                    }}>Edit</a>
                                </td>
                                <td>
                                    <a onClick={()=>{
                                        let edit_id = doc._id;
                                        this.deleteData(edit_id);
                                    }}>Delete</a>
                                </td>
                            </tr>

                        })
                    }
                </table>
            </div>

        )
    }

}

export default Display