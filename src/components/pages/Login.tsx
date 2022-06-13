import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from '../../app/hooks';
import {userSignIn} from "../../features/booking/bookingSlice"


export function Login() {
    let navigate = useNavigate();
    const dispatch = useAppDispatch();
    

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleOnClick = () => {
        dispatch(userSignIn({username, password}))
        .then(res => {
                if(res.type !== "userSignIn/rejected"){
                    navigate('/user/booking');
                }
        });        
    }

    const handleOnKeyEnter = (e: any) => {

        if(e.key === 'Enter'){
            dispatch(userSignIn({username, password}))
            .then(res => {
                    if(res.type !== "userSignIn/rejected"){
                        navigate('/user/booking');
                    }
            });   
        }   
    }



    
    

  return (
    <div className='login-page container'>
        

        <Grid 
                container 
                spacing={2} 
                direction="column"
                alignItems="center"
            >
                <Grid item xs={12}>
                    <h3>Login</h3>
                </Grid>
            <Grid item xs={12}>
                <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        alignItems="center"
                        >
                    <div>
                        <TextField id="username" label="Username" variant="outlined" 
                        onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div>
                        <TextField id="password" label="Password" variant="outlined" type="password" 
                        onChange={(e) => setPassword(e.target.value)} 
                        onKeyDown={(e) => handleOnKeyEnter(e)}/>
                    </div>
                    
                    
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Button variant="outlined" onClick={() =>handleOnClick()}>Login</Button>
            </Grid>
            </Grid>
        

            
    </div>
  );
}