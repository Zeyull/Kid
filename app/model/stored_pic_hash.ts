import { DataTypes } from 'sequelize';
import { Model, Table, Column, } from 'sequelize-typescript';

@Table({ tableName: 'stored_pic_hash' })
export default class StoredPicHash extends Model {
    @Column({ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true })
    id!: number;

    @Column({ type: DataTypes.STRING(50), allowNull: false })
    hash!: string;

    @Column({ type: DataTypes.STRING(100), allowNull: false })
    url!: string;
}