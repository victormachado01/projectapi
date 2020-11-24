import React, { useState } from 'react';
import { Box, TextField, Button } from '@material-ui/core';
import { userService } from '../services';

import {
  Link,
} from "react-router-dom";

export default function Login() {

    const [email, setLogin] = useState('');
    const [pass, setSenha] = useState('');
  
    const  login = async () => {
      let response = await userService.user.login({email, pass})
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
      localStorage.setItem('userToken', response.data.token);
      window.location.href = '/';
    }

    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignContent="center" 
        alignItems="center"
        flexDirection="column"
        height="100vh"
      >
        <TextField 
          onChange={(e) => setLogin(e.target.value)} 
          label="Email"
        />
        <Box m={1} />
        <TextField 
          onChange={(e) => setSenha(e.target.value)} 
          label="Senha" 
          type="password"
        />
        
        <Box m={5}>
          <Button 
            color="primary" 
            variant="contained"
            onClick={login}
          >
            Entrar
          </Button>
        </Box>
        <Box m={5}>
          <a href="/cadastro">Criar conta</a>
        </Box>
      </Box>
    );
}
