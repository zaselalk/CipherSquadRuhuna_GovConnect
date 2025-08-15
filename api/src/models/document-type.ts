"use strict";

import { Model, DataTypes } from "sequelize";
import sequelize from "./sequelize";
import { DATE } from "sequelize";

export class DocumentType extends Model {
    public doc_id!: number;
    public name!: string;
    public description!: string | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date | null;
}

DocumentType.init(
    {
        doc_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DATE,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DATE,
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "DocumentType",
        tableName: "document_types",
        timestamps: true,
        paranoid: true, // enables deletedAt for soft deletes
    }
);