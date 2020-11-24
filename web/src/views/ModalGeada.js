import React, { useState } from 'react'
import { Box, Card, CardHeader, CardContent, CardActions, Button, Modal } from '@material-ui/core'
import { useEffect } from 'react';
import { farmService } from '../services';

export default function ModalGeada({ farm }) {

  const [openFarm, setOpenFarm] = useState(false);
  const [status, setStatus] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const consultar = async () => {
      if(!loaded) {
        const response = await farmService.farm.frost(farm._id);
        setLoaded(true)
        setStatus(response.data)
      }
    }

    consultar();
  }, [loaded, farm._id])

  const setModalOpen = () => {
    setOpenFarm(!openFarm)
  }

  return (
    <Box>
      <Button onClick={setModalOpen}>Consultar geada</Button>
      <Modal open={openFarm}>
        <Box 
          display='flex'
          justifyContent='center'
          alignItems='center'  
          width="100%"
          height='100vh'
        >
          <Card>
            <CardHeader title={`Consultar geada para ${farm.name}`} action={
              <Button onClick={setModalOpen}>X</Button>
            }
          />
            <CardContent>
              <Box m={2}>
                Alerta: {status.frost}
              </Box>
            </CardContent>
            <CardActions>
              <Button onClick={setModalOpen}>Fechar</Button>
            </CardActions>
          </Card>
        </Box>
      </Modal>
    </Box>
  )
}