import { QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkInsert("divisions", [
      { divisionName: "Katugahahena" },
      { divisionName: "Diyagala" },
      { divisionName: "Kotagedara" },
      { divisionName: "Maddegadara" },
      { divisionName: "Nawutthuduwa" },
      { divisionName: "Kolahekada" },
      { divisionName: "Hempita" },
      { divisionName: "Karampathara" },
      { divisionName: "Katugoda" },
      { divisionName: "Delgoda" },
      { divisionName: "Pahalawela" },
      {divisionName: "Boopitiya" },
    ]);
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkDelete("divisions", {
      divisionName: [
        "Katugahahena",
        "Diyagala",
        "Kotagedara",
        "Maddegadara",
        "Nawutthuduwa",
        "Kolahekada",
        "Hempita",
        "Karampathara",
        "Katugoda",
        "Delgoda",
        "Pahalawela" ,
        "Boopitiya",
      ],
    });
  },
};
