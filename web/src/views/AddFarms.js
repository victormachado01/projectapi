import React, { useState } from 'react'
import { Box, Card, CardHeader, CardContent, CardActions, Button, Modal, TextField } from '@material-ui/core'

export default function AddFarmModal() {

  const [openFarm, setOpenFarm] = useState(false);

  const setModalOpen = () => {
    setOpenFarm(!openFarm)
  }

  return (
    <>
      <Button variant='contained' onClick={setModalOpen}>add Fazenda</Button>
      <Modal open={openFarm}>
        <Box 
          display='flex'
          justifyContent='center'
          alignItems='center'  
          width="100%"
          height='100vh'
        >
          <Card>
            <CardHeader title="Adicionar fazenda" action={
              <Button onClick={setModalOpen}>X</Button>
            }
          />
            <CardContent>
              <Box m={2}>
                <TextField id="name" label="Nome da Fazenda" />
              </Box>
              <Box m={2}>
                <TextField id="city" label="Cidade" />
              </Box>
              <Box m={2}>
                <TextField id="number" label="Numero de endereço" />
              </Box>
            </CardContent>
            <CardActions>
              <Button variant='contained' color='primary' onClick={setModalOpen}>Salvar</Button>
              <Button onClick={setModalOpen}>Cancelar</Button>
            </CardActions>
          </Card>
        </Box>
      </Modal>
    </>
  )
}