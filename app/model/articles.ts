import { DataTypes } from 'sequelize';
import { Model, Table, Column, } from 'sequelize-typescript';

@Table({ tableName: 'articles' })
export default class Articles extends Model {
    @Column({ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true })
    id!: number;

    @Column({ type: DataTypes.STRING(50), allowNull: false })
    title!: string;

    @Column({ type: DataTypes.STRING(100), allowNull: false })
    content!: string;

    @Column({ type: DataTypes.DATE, allowNull: true })
    created_at?: string;

    @Column({ type: DataTypes.DATE, allowNull: true })
    updated_at?: string;

    @Column({ type: DataTypes.STRING(64), allowNull: true })
    picture?: string;

    @Column({ type: DataTypes.TINYINT, allowNull: false})
    is_visible!: string;
}