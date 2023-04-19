import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { getAlbumsByArtist } from './spotifyAPI';
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors({
  origin: '*'
}));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.post('/albums', async (req: Request, res: Response) => {
  const artistName = req.body.name;

  try {
    const albums = await getAlbumsByArtist(artistName);

    res.json(albums);
  } catch (error) {
    console.error(error);

    res.status(500).send('Error al obtener los álbumes del artista');
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});