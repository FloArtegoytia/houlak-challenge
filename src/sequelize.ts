import { Sequelize } from 'sequelize-typescript';
import { Solicitud } from './models/models';

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'myusername',
    password: 'mypassword',
    database: 'db',
    models: [Solicitud]
});

export const saveSolicitud = (ip: string, date: Date, artista: string) => {
    try {
        const nuevaSolicitud = new Solicitud({
            ip: ip,
            fecha: date,
            artista: artista
        });
        
        nuevaSolicitud.save();
    } catch (err: any) {
        new Error(err);
    }
}

export { sequelize };