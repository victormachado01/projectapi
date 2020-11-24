import React, { useState } from 'react';
import { Box, TextField, Button } from '@material-ui/core';
import { userService } from '../services';

export default function Register() {

    const [email, setLogin] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [pass, setSenha] = useState('');
  
    const  login = async () => {
        await userService.user.register({name, email, phone, password: pass});
        window.location.href = '/'
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
          onChange={(e) => setName(e.target.value)} 
          label="Nome"
        />
        <Box m={1} />
        <TextField 
          onChange={(e) => setLogin(e.target.value)} 
          label="Email"
        />
        <Box m={1} />
        <TextField 
          onChange={(e) => setPhone(e.target.value)} 
          label="Telefone"
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
            Cadastrar
          </Button>
          <Box m={5}>
            <a href="/">Voltar</a>
          </Box>
        </Box>
      </Box>
    );
}
