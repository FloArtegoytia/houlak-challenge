import React, { useState } from 'react';
import { Container, Grid, Paper, TextField, Button, CircularProgress, Alert, Typography } from '@mui/material';
import axios from 'axios';

const App = () => {
  const [artistName, setArtistName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOnClick = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/albums', {
        name: artistName,
      });
      console.log(response)

    } catch (error) {
      console.error(error);
      setError('Error al obtener los álbumes del artista.');
    }

    setIsLoading(false);
  }

  return (
    <Container maxWidth="md" className="py-4" sx={{ mt:"50px" }}>
      <Grid container spacing={3} justifyContent="center" direction="column">
        <Typography variant="h4">Spotify Albums</Typography>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} className="p-3">
            <TextField
              label="Artist name"
              fullWidth
              value={artistName}
              onChange={(event) => setArtistName(event.target.value)}
            />

            <Button variant="contained" color="primary" type="submit" disabled={isLoading} onClick={handleOnClick}>
              {isLoading ? <CircularProgress size={24} /> : 'Buscar'}
            </Button>

            {error && (
              <Alert severity="error" className="mt-3">
                {error}
              </Alert>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container> 
  );
}

export default App;
