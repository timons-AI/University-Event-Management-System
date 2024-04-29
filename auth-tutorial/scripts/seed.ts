const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.venue.createMany({
      data: [
        {
          name: "Cocis Big Lab 2",
          address: "Cocis Big Lab 2, Makerere University, Kampala",
          city: "Kampala",
        },
        {
          name: "Cocis Big Lab 1",
          address: "Cocis Big Lab 1, Makerere University, Kampala",
          city: "Kampala",
        },
        {
          name: "Cocis Big Lab 3",
          address: "Cocis Big Lab 3, Makerere University, Kampala",
          city: "Kampala",
        },
        {
          name: "CEDAT Big Lab 4",
          address: "CEDAt Big Lab 4, Makerere University, Kampala",
          city: "Kampala",
        },
      ],
    });

    console.log("Seeding finished.");
  } catch (error) {
    console.log(" Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();

// Run command to seed the database
// node scripts/seed.ts
