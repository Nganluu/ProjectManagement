import React, { Component } from 'react'
import '../../styles/Login.css'
import {userSignup} from '../../Actions/accountActions'
import { FormGroup, Label, Input, Button } from 'reactstrap'
import {connect} from 'react-redux'

class body extends Component {
    constructor(props){
        super(props);
        this.state={
            name: "",
            email: "",
            password: "",
            nameError: false,
            emailError: false,
            passError: false,
            registered: false
        }
    }
    //Name
    onChangeName = (event)=>{
        this.setState({name: event.target.value}, ()=>{
            this.validateName()
        }) 
    }
    validateName = () => {
        const { name } = this.state;
        this.setState({
          nameError:
            name.length > 0 ? null : true
        });
      }
    onChangeEmail = (event)=>{
        this.setState({email: event.target.value}, ()=>{this.validateEmail()})
    }
    validateEmail = () => {
        const { email } = this.state;
        this.setState({
          emailError:
            email.length > 0 ? null : true
        });
      }
     
    onChangePassword = (event)=>{
        this.setState({password: event.target.value}, ()=>{this.validatePassword()})
    }
    validatePassword = () => {
        const { password } = this.state;
        this.setState({
         passError:
            password.length > 0 ? null : true
        });
      }
  
    // fetchRegister=()=>{
    //     fetch("",{
    //         method: "POST",
    //         body: JSON.stringify({
    //             name: this.state.name,
    //             email: this.state.email,
    //             password: this.state.password,
    //                        })
    //     }).then(res=>{
    //         this.setState({registered: true})
    //     })
        
    // }
    handleRegister=()=>{
       this.props.userSignup(this.state.name, this.state.email, this.state.password)
        // this.fetchRegister()
    }
    render() {
      
        return (
            <div id="body" className="row">
                <div style={{ fontSize: "25px" }} className="col-md-7">
                    <p style={{ margin: "35%", marginLeft: "20%", fontSize: "30px" }}>
                        <b>EASY WAY TO MANAGE <br /> YOUR PROJECT</b>
                        <p style={{ fontSize: "20px" }}>
                            Our website provides you <br />
                            an easy way to manage  <br />
                            your project and to do list everyday.</p>
                    </p>
                </div>
                {/* sign up form */}
                <div className="col-md-5" style={{ paddingTop: "15%" }}>
                    <div className="col-md-8">
                   <b style={{fontSize: "35px"}}> REGISTER </b>
                        <FormGroup>
                            <Label for="input" >Name</Label>
                            <br />
                            {this.state.nameError? 
                            <b style={{color: "#ac2403", fontSize: "15px"}}>* Cannot be blank</b>                         
                            : null}
                            <Input type="text" id="input" name="input" placeholder="Proman Team"
                            onChange={this.onChangeName} value={this.state.name}
                            onBlur={this.validateName}></Input>
                           
                            
                        </FormGroup>
                        <FormGroup>
                            <Label for="input">Email</Label>
                            <br />
                            {this.state.emailError? 
                            <b style={{color: "#ac2403", fontSize: "15px"}}>* Cannot be blank</b>                         
                            : null}
                            <Input type="text" id="input" name="input" placeholder="promanteam@proman.com"
                            onChange={this.onChangeEmail} value={this.state.email}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="input">Password</Label>
                            <br/>
                            {this.state.passError? 
                            <b style={{color: "#ac2403", fontSize: "15px"}}>* Cannot be blank</b>                         
                            : null}
                            <br />
                            <Input type="password" id="input" name="input" placeholder="********"
                            onChange={this.onChangePassword} value={this.state.password}></Input>
                        </FormGroup>
                       
                        <div>
                        <Button onClick={this.handleRegister}>Sign up</Button>
                        </div> 
                    </div>
                </div>
            </div>
        )
    }
}
const mapStatetoProps=(state)=>{

}

export default connect(mapStatetoProps, {userSignup})(body)
