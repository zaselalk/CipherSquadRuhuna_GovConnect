import { Association, DataTypes, Model, Sequelize } from "sequelize";
import { Department } from "./department";


export class DepartmentOfficer extends Model {
    public officer_id!: number;
    public position!: string;
    public department_id!: number;
    public createdAt?: Date;
    public updatedAt?: Date;
    public deletedAt?: Date | null;

    // Association
    public readonly department?: Department;

    public static associations: {
        department: Association<DepartmentOfficer, Department>;
    };

    static initModel(sequelize: Sequelize): typeof DepartmentOfficer {
        DepartmentOfficer.init(
            {
                officer_id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false,
                },
                position: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                department_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: "departments",
                        key: "dep_id",
                    },
                },
                createdAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: DataTypes.NOW,
                },
                updatedAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: DataTypes.NOW,
                },
                deletedAt: {
                    type: DataTypes.DATE,
                    allowNull: true,
                },
            },
            {
                sequelize,
                tableName: "department_officers",
                modelName: "DepartmentOfficer",
                timestamps: true,
                paranoid: true,
            }
        );
        return DepartmentOfficer;
    }

    static associate(): void {
        DepartmentOfficer.belongsTo(Department, {
            foreignKey: "department_id",
            targetKey: "dep_id",
            as: "department",
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
        });
    }
}
