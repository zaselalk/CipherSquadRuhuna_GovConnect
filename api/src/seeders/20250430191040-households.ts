import { QueryInterface } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert("households", [
      // New entries based on the given division list
      {
        house_no: "12A",
        grama_division: "Kotagedara",
        longitude: 6.489720802,
        latitude: 80.084187593,
        owner_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        house_no: "14B",
        grama_division: "Navuththuduwa",
        longitude: 6.4903325,
        latitude: 80.083685417,
        owner_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        house_no: "21A",
        grama_division: "Bopitiya",
        longitude: 6.490475333,
        latitude: 80.083943417,
        owner_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        house_no: "22A",
        grama_division: "Maddegedara",
        longitude: 6.490525152,
        latitude: 80.083716364,
        owner_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        house_no: "24B",
        grama_division: "Pahalawela",
        longitude: 6.490402667,
        latitude: 80.084311667,
        owner_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        house_no: "25C",
        grama_division: "Kolahekada",
        longitude: 6.4901975,
        latitude: 80.0845725,
        owner_id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        house_no: "27A",
        grama_division: "Narawila",
        longitude: 6.490591786,
        latitude: 80.084634245,
        owner_id: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        house_no: "28B",
        grama_division: "Yatadola",
        longitude: 6.490843,
        latitude: 80.083716,
        owner_id: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        house_no: "30C",
        grama_division: "Henpita",
        longitude: 6.490886078,
        latitude: 80.083787108,
        owner_id: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        house_no: "32A",
        grama_division: "Pallegoda",
        longitude: 6.490988333,
        latitude: 80.083746667,
        owner_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("households", {
      house_no: [
        "12A", "14B", "21A", "22A", "24B", "25C", "27A", "28B", "30C", "32A"
      ],
    });
  },
};
