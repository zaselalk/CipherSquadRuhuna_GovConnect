import { QueryInterface, DataTypes } from "sequelize";

export const up = async (queryInterface: QueryInterface) => {
  // Create the 'clinics' table
  try {
    await queryInterface.createTable("clinics", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true, // Automatically increment the ID
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false, // name column cannot be null
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const down = async (queryInterface: QueryInterface) => {
  // Drop the 'clinics' table
  try {
    // check if the sessions table exists before dropping
    const tableExists = await queryInterface.sequelize.query(
      `SELECT * FROM information_schema.tables WHERE table_name = 'clinicsessions'`
    );
    if (tableExists[0].length > 0) {
      console.log("clinicsessions table has data, dropping the table");
      // Drop the 'clinicsessions' table
      await queryInterface.dropTable("clinicsessions");
    }

    await queryInterface.dropTable("clinics");
  } catch (error) {
    console.log(error);
  }
};
