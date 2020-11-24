import React, { useState } from 'react'
import { Box, Card, CardHeader, CardContent, CardActions, Button, Modal, TextField, Select, Typography } from '@material-ui/core'
import { useEffect } from 'react';
import { cityService, farmService } from '../services';

export default function AddFarmModal() {

  const [openFarm, setOpenFarm] = useState(false);
  const [cities, setCities] = useState([])
  const [citiesLoaded, setLoaded] = useState(false)
  useEffect(() => {
    const listCities = async () => {
      let cities = await cityService.city.list()
      setCities(cities.data)
      setLoaded(true)
    }

    if(!citiesLoaded){
      listCities()
    }
  }, [citiesLoaded])
  const setModalOpen = () => {
    setOpenFarm(!openFarm)
  }

  const [name, setName] = useState('');
  const [city_id, setCity] = useState('');
  const [number, setNumber] = useState('');

  const create = async () => {
    console.log({city_id, number, name})
    await farmService.farm.create({city_id, number, name})
    setModalOpen()
    window.location.reload()
  }

  return (
    <>
      <Button variant='contained' onClick={setModalOpen}>Adicionar Fazenda</Button>
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
                <TextField 
                  required
                  id="name" 
                  label="Nome da Fazenda" 
                  onChange={(e) => setName(e.target.value)} 
                  fullWidth
                />
              </Box>
              <Box m={2}>
                <Typography variant="body1">Cidade</Typography>
                <Select
                  value={city_id}
                  native
                  fullWidth
                  onChange={(e) => setCity(e.target.value)}
                  required
                >
                  <option value="" selected></option>
                  {cities.map((city) => (
                    <option key={city._id} value={city._id}>{city.name}</option>
                  ))}
                </Select>
              </Box>
              <Box m={2}>
                <TextField
                  required
                  id="number"
                  label="Numero de endereço" 
                  onChange={(e) => setNumber(e.target.value)}
                  fullWidth
                />
              </Box>
            </CardContent>
            <CardActions>
              <Button variant='contained' color='primary' onClick={create}>
                Salvar
              </Button>
              <Button onClick={setModalOpen}>Cancelar</Button>
            </CardActions>
          </Card>
        </Box>
      </Modal>
    </>
  )
}