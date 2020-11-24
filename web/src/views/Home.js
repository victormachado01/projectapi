import React, { useEffect, useState } from 'react'
import AddFarmModal from '../views/AddFarms'
import ModalGeada from '../views/ModalGeada' 
import {
  Box, Button, Paper, Table, TableBody, TableCell, TableContainer, 
  TableHead, TablePagination, TableRow, Typography 
} 
from '@material-ui/core';
import { farmService } from '../services';

function Home({ user, setAuth }) {
  const [page, setPage] = useState(0);
  const [farms, setFarms] = useState([])

  useEffect(() => {
    const getFarms = async () => {
      let response = await farmService.farm.list()
      setFarms(response.data.fazendas.filter(farm => farm.owner && farm.owner._id === user._id))
    }
    getFarms()
  }, [user._id])

  const logout = () => {
    localStorage.removeItem('userToken')
    localStorage.removeItem('user')
    setAuth(false)
  }


  return (
    <Box 
      width="99%"
      height="95vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box
        alignSelf="flex-start"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        alignContent="center"
        p={1}
        width="99%"
      >
        <Typography>
          Bem vindo {user.name}
        </Typography>
        <Button
          onClick={logout}
        >
          Sair
        </Button>
      </Box>
      <Box 
        alignSelf="flex-end"
      >
        <AddFarmModal/>
      </Box>
      <Box width="100%">
        <Box
          width="20%"
          display="flex"
          alignContent="center"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant='h5'>
            Minhas fazendas
          </Typography>
        </Box>
        {farms.length > 0 && <TableContainer style={{
          minWidth: '100vh'
        }} component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {farms.map((row) => {
                if(row.owner && row.owner._id === user._id)
                  return (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">
                        <ModalGeada farm={row} />
                      </TableCell>
                    </TableRow>
                  )
                return <></>
              })}
            </TableBody>
          </Table>
        </TableContainer>}
        {farms.length === 0 && <Typography>Nenhuma fazenda encontrada</Typography>}
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={farms.length}
          rowsPerPage={5}
          page={page}
          onChangePage={(e, p) => setPage(p)}
        />
      </Box>
    </Box>
  );
}

export default Home;
