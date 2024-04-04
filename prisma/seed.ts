import { prisma } from "../src/lib/prisma";
async function seed() {
  await prisma.event.create({
    data: {
      id: "be38835f-31d7-4178-bcc7-4dcad81ffcf8",
      title: "Unite Summit",
      slug: "unite-summit",
      details: "Um evento para devs apaixonados(as) por código",
      maximumAttendees: 120,
    },
  });
}

seed().then(() => {
  console.log("Database seeded!");
  prisma.$disconnect();
});
