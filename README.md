# houlak-challenge/Houlak Spotify Albums Web Project 🎵

## Propuesta 📜

Utilizando la API de Spotify, se deben listar todos los álbumes (con sus respectivas imágenes) de un artista en particular ordenados descendentemente por popularidad. 

El nombre del artista debe ser proporcionado por el usuario desde el frontend. En caso de que exista más de un artista con ese nombre se debe seleccionar el primer artista de la lista.

Por cada solicitud, el backend debe almacenar en la DB la IP del usuario, la fecha de la solicitud y el nombre del artista.
​
El frontend no debe comunicarse directamente con la API de Spotify. Debe comunicarse con
el backend y desde este es que se debe realizar la request a la API de Spotify.

El diseño debe ser responsive.

## Tecnologías 💻
### Frontend
 - React
### Backend
 - Node / Express utilizando TypeScript
 - Un ORM como Sequelize o similar para manejar la DB
### Storage
 - Cualquier DB de tipo relacional

## Notas 🗒
- Se valorará el buen uso de git (commits, branches, etc.)
- Se pueden utilizar librerías extra, tanto de frontend como de backend

## Como ejecutar el proyecto

### Backend
```
npm install
```
```
npm run dev
```
### Frontend
```
npm install
```
```
npm run build
```
```
npm run start
```
### Database
```
docker-compose up -d
```