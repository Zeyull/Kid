import { DataTypes } from 'sequelize';
import { Model, Table, Column, } from 'sequelize-typescript';

@Table({ tableName: 'announcements' })
export default class Announcements extends Model {
    @Column({ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true })
    id!: number;

    @Column({ type: DataTypes.TEXT, allowNull: false })
    content!: string;

    @Column({ type: DataTypes.DATE, allowNull: false })
    announcement_time!: string;

    @Column({ type: DataTypes.STRING(255), allowNull: false })
    icon!: string;
}