import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import validator from 'validator';


export default function Signup(props) {
  const { register, setError, formState : { errors } } = useForm();
  const jobs = props.occupations;
  const locations = props.states;

  const [job, setJob] = useState()

  const [location, setLocation] = useState()

  const [fullName, setFullName] = useState()

  const [email, setEmail] = useState()

  const [password, setPassword] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = {
      "name": fullName,
      "email": email,
      "password": password,
      "occupation": job,
      "state": location
    }
    if(data["name"] === undefined){
      setError('fullName', {
        type: 'custom', 
        message: "Please enter your full name"
      })
    }
    
  if(data['email'] === undefined) {
    setError('email', {
      type: 'custom', 
      message: "Please enter your email"
    })
  }
    if(!validator.isEmail(email)){
      console.log('error')
      setError('email', {
        type: 'custom',
        message: "Please enter a valid email"
      })
    }

    if(data["password"] === undefined || data["password"].length < 8){
      setError('password', {
        type: 'custom', 
        message: 'Please enter a password'
      })
    }
   if(data["occupation"] === undefined){
    setError('job', {
      type: 'custom', 
      message: "Please select your occupation"
    })
   }
    if(data["state"] === undefined){
      setError('location', {
        type: 'custom', 
        message: "Please select your state"
      })
    }
    if(errors.length === undefined){
      props.signUp(data);
    }
    
   
  }


  return (
    <div>
    <form className='form' onSubmit={handleSubmit}> 
    <h1 className='header'> Sign Up for Fetch Rewards!</h1>
    <label> Full Name </label>
    <br />
    <input {...register("fullName", { required: true, message: 'Please enter your full name'})} 
    type='text' name='fullName' value={fullName} onChange={e => setFullName(e.target.value)} />
    <br />
    <p className="errors"> {errors.fullName?.message} </p>
    <br />
    <label> Email </label>
    <br />
    <input {...register('email', {required: true, pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"})}
     tpye='text' name='email' value={email} onChange={e => setEmail(e.target.value)} />
    <br/>
    <p className="errors"> {errors.email?.message} </p>
    <br />
    <label> Password </label>
    <br />
    <input {...register('password', {required: true, minLength: 8, message: "Your password is must be at least 8 characters"})} 
    type='password' name='password' value={password} onChange={e => setPassword(e.target.value)} />
    <br/>
    <p className="errors"> {errors.password?.message} </p>
    <br />
    <label> Select your Occupation </label>
    <br />
    <select 
    {...register('job', {required: true, message: 'Please select your occupation'})}
        defaultValue={"⬇️ Please select your occupation ⬇️"} 
        onChange={e => setJob(e.target.value)}
      >
          <option value="⬇️ Please select your occupation ⬇️" disabled hidden> Please select your occupation </option>
          {jobs !== undefined ? jobs.map((job) => <option key={job} value={job}>{job}</option>) : null} 
      </select>
      <br/>
      <p className="errors"> {errors.occupation?.message} </p>
      <br/>
      <label> Select your State </label>
      <br/>
      <select 
      {...register('location', {required: true, message: "Please select your state"})}
        defaultValue={"⬇️ Please select your state ⬇️"} 
        onChange={e => setLocation(e.target.value)}
      >
          <option 
            value="⬇️ Please select your state ⬇️" 
            disabled 
            hidden
          > Please select your state </option>
          {locations !== undefined ? locations.map((location) => <option key={location.abbreviation} value={location.name}>{location.name}</option>) : null}
      </select>
      <br/>
      <p className="errors"> {errors.location?.message} </p>
      <br/>
      <br/>
      <input type='submit'/>
    </form>
    </div>
  )
    
};
