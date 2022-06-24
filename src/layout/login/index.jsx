import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import njcicon from '../../assets/icons/logo_gray.webp';
import './login.scss';
import { useHistory } from 'react-router-dom';
import url from "../../config.js";
import * as myConst  from "../../constants/configurationPageConstants";


const domain = url.domain;
const useStyles = myConst.useStyles;

function Login () {
  const history = useHistory()
  const [state,setState] = useState({
    username: '',
    password: '',
    loginPage:true,
    loginFailedmessage: '',
    email: '',
    emailValid: false,
    usernameValid: false,
    passwordValid:false,
    emailErrorMessage:'',
    usernameErrorMessage:'',
    passwordErrorMessage:'',
    reguseremail:'',
    invalidUser:false,
    registrationFailed:false
     })
  const handleChange = e => {
    e.persist()     
    if(e.target.name =='email'){     
      let emailValidtemp = e.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);      
      setState(prevState =>({...prevState,[e.target.name]: e.target.value ,emailErrorMessage : (emailValidtemp?'':'Please enter a valid Mail '),[e.target.name+'Valid'] :true}))   
    }
    else{
      setState(prevState =>({...prevState, [e.target.name]: e.target.value ,[e.target.name+'ErrorMessage'] :'',[e.target.name+'Valid'] :true}))
    }
  }  
  const register = () => {
    let emailValidtemp = state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    let emailValidator  = emailValidtemp ? '' : ' is invalid';
    if (emailValidator== ''){
      setState(prevState =>({...prevState,emailValid:true}))
    } else{
      setState(prevState =>({...prevState,emailErrorMessage:"Please enter a valid email"}))
    }
    if(state.password == ''){
      setState(prevState =>({...prevState,passwordValid:false,passwordErrorMessage:"Please enter a password"}))
    }
    if(state.username == ''){
      setState(prevState =>({...prevState,usernameValid:false,usernameErrorMessage:"Please enter a username"}))
    }
    if( state.emailValid && state.passwordValid && state.usernameValid){
    var postObj =
    {
      "username": state.username,
      "password": state.password,
      "email": state.email,
      "roles": [
        "user",
        "moderator"
      ]

    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postObj)
    };
    fetch(domain + '/api/auth/register', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data && !data.message) {
          history.push('/settings');
         setState(prevState=>({...prevState, loginPage: true }))
        } else if (data.message) {
          setState(prevState=>({...prevState, registrationFailed: true }))
          setState(prevState=>({...prevState,registrationFailedMessage: data.message }))
        }

      });}
      else{

      }
  }
  const loginFun=()=>{
    var postObj =
    {
      "username": state.username,
      "password": state.password,

    }
    console.log("inside log function",postObj)

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postObj)
    };
    fetch(domain + '/api/auth/signin', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log("login response",data)
        if (data.message != 'User not found' && data.message != 'Invalid Password!') {
          console.log("inside log success")
          localStorage.setItem('token', data.accessToken)
         history.push('/dashboard');
        }
        else {
          console.log("log failed")
          setState(prevState=>({...prevState, invalidUser: true }))
          setState(prevState=>({...prevState, loginFailedmessage: data.message }))
        }
      });
  }
  const changeLoginFrom = () => {
    let page = !state.loginPage;
    setState(prevState=>({...prevState,loginPage: page }))
  }
 const getFormBody = () => {
   
    if (state.loginPage) {
      return (
        <div>
          
          <label className="form-label">Username *</label> 
          <TextField
            className="form-input"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            placeholder="Enter your Username"
            name="username"
            onChange={(e)=>handleChange(e)}
            //onChange={(e)=>setUserName(e.target.value)}
            autoComplete="username"
          />
          <label className="form-label">Password *</label>
          <Link className="forgot-pwd" href="#" variant="body2">
            Forgot password?
                </Link>
          <TextField
            className="form-input"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            placeholder="Enter your password"
            type="password"
            id="password"
            onChange={(e)=>handleChange(e)}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" />}
            label="Remember me"
          />
          <button type="button" onClick={()=>loginFun()} className="form-button">Sign In</button>
          
          <Grid container>
            <Grid item>
              <Link onClick={() => changeLoginFrom()} variant="body2" href="#" >
                Don't have an account? <span>Sign Up </span>
              </Link>
            </Grid>
          </Grid>

          {state.invalidUser ? <div className="invalid-user-wrap">
            <label className="">
              {
                state.loginFailedmessage !== '' ? state.loginFailedmessage : "Invalid Username/Password"
              }

            </label>
          </div> : null}

        </div>

      );
    }
    else {
      return (
        <div>
           
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <label className="form-label">First name</label>
              <TextField
                className="form-input"
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                placeholder="Enter First Name"
                required
                fullWidth
                id="firstName"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <label className="form-label">Last name</label>
              <TextField
                variant="outlined"
                className="form-input"
                required
                fullWidth
                id="lastName"
                placeholder="Enter Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <label className="form-label">Username *</label>
              <TextField
                variant="outlined"
                className="form-input"
                required
                fullWidth
                id="username"
                name="username"
                placeholder="Enter Username"
                autoComplete="username"
                onChange={(e)=>handleChange(e)}
                />
            </Grid>
            <div className="invalid-user-wrap">
            <label className="">
             {state.usernameErrorMessage}
            </label>
          </div>
            <Grid item xs={12}>
              <label className="form-label">Email *</label>
              <TextField
                variant="outlined"
                className="form-input"
                required
                fullWidth
                id="email"
                name="email"
                placeholder="Enter Email"
                autoComplete="email"
                 onChange={(e)=>handleChange(e)}

              />
            </Grid>
             <div className="invalid-user-wrap">
            <label className="">
             {state.emailErrorMessage}
            </label>
          </div>
            <Grid item xs={12}>
              <label className="form-label">Password *</label>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                className="form-input"
                type="password"
                id="password"
                placeholder="Enter Password"
                autoComplete="current-password"
                onChange={(e)=>handleChange(e)}

              />
            </Grid>
            <div className="invalid-user-wrap">
            <label className="">
             {state.passwordErrorMessage}
            </label>
          </div>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <button type="button" onClick={() => register()} className="form-button">Register</button>

          <Grid container justify="flex-end">
            <Grid item>
              <Link variant="body2" href="#" onClick={() => changeLoginFrom()}>
                Already have an account? Sign in
                </Link>
            </Grid>
          </Grid>
          
          {state.registrationFailed ? <div className="invalid-user-wrap">
            <label className="">
              {state.registrationFailedMessage}
            </label>
          </div> : null}
        </div>
      )
    }
  }
  console.log("login page state",state.loginPage,state)
    return (
      <Container className="components-main" component="main" maxWidth="xs" >
        <CssBaseline />
        <div className="paper login-card">

          <form className="login-form" noValidate>
            <div className="image-wrap">
              <a href="https://www.mulesoft.com" className="components--logo-link__1ZdlpD">
                <img alt="MuleSoft" className="components--logo-img__3108zO" src={njcicon} /></a>
              <div>
                              {state.loginPage?

                <label>SIGN IN</label>:<label>SIGN UP</label>}
              </div>
            </div>

            {getFormBody()}
          </form>
        </div>

      </Container>
    );
  }
export default withStyles(useStyles)(Login);
