import { DataTypes } from 'sequelize';
import { Model, Table, Column, } from 'sequelize-typescript';

@Table({ tableName: 'account' })
export default class Account extends Model {
    @Column({ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true })
    id!: number;

    @Column({ type: DataTypes.STRING(50), allowNull: false })
    username!: string;

    @Column({ type: DataTypes.STRING(100), allowNull: false })
    password!: string;

    @Column({ type: DataTypes.STRING(100), allowNull: true })
    description!: string;

    @Column({ type: DataTypes.STRING(64), allowNull: false })
    salt!: string;
}