import fs from "fs";

import prisma from "../client/client";

async function importData() {
  const seedFile = fs.readFileSync("./prisma/seed/seed.csv", "utf8");
  const rows = seedFile.split("\n");

  console.log("Importing data...");

  try {
    for (const row of rows) {
      const [name, glyph, unicode, category, description] = row.split(",");

      let formattedName = name;

      if (!formattedName.startsWith("&")) {
        formattedName = `&${formattedName}`;
      }

      if (!formattedName.endsWith(";")) {
        formattedName = `${formattedName};`;
      }

      await prisma.htmlEntity.create({
        data: { glyph, name: formattedName, unicode, category, description },
      });
    }

    console.log("Data imported successfully");
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

importData();
