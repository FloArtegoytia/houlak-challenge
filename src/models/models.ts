import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'solicitudes' })
class Solicitud extends Model {
    @Column(DataType.STRING)
    ip!: string;

    @Column(DataType.DATE)
    fecha!: Date;

    @Column(DataType.STRING)
    artista!: string;
}

export { Solicitud };