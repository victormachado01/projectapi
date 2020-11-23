import React, { useState } from 'react';
import { Container, Box, TextField, Button } from '@material-ui/core';

export default function Login() {

    const [login, seTLogin] = useState('SeuZé');
    const [senha, setSenha] = useState('');
  
    return (
        <Box 
            display="flex" 
            justifyContent="center" 
            alignContent="center" 
            alignItems="center"
            flexDirection="column"
            height="100vh"
        >
            <TextField id="standard-basic" label="Usuário"/>
            <Box m={1} />
            <TextField id="standard-basic" label="Senha" type="password" />
            
            <Box m={5}>
                <Button 
                    color="primary" 
                    variant="contained"
                    onClick={() => {alert('clicado')}}
                >
                    Entrar
                </Button>
            </Box>
        </Box>
    );
}
