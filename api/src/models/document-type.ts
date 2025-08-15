"use strict";

import { Model, DataTypes, Sequelize } from "sequelize";

interface DocumentTypeAttributes {
    doc_id?: number;
    name: string;
    description?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}

module.exports = (sequelize: Sequelize) => {
    class DocumentType
        extends Model<DocumentTypeAttributes>
        implements DocumentTypeAttributes {
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
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
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

    return DocumentType;
};
