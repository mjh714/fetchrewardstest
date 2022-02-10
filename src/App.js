import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Form from './Component/Form';

export default function App(){
  const [data, setData] = useState({ occupation: [], state: [] });
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://frontend-take-home.fetchrewards.com/form',
      );

      setData(result.data);
    };

    fetchData();
  }, []);

  const signupHandler = (data) => {
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }
    fetch('https://frontend-take-home.fetchrewards.com/form', options)
    .then(response => {
      if(response.status === 200){
        alert("User successfully created")
      }
    })
  };

  return (
    <>
    <Form occupations={data.occupations} states={data.states} signUp={signupHandler}/>
    </>
  )

}
