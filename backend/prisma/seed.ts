import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.driver.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Homer Simpson",
      description:
        "Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).",
      car: "Plymouth Valiant 1973 rosa e enferrujado",
      tax: 2.5,
      min_km: 1,
      Review: {
        create: [
          {
            rating: 2,
            comment:
              "Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.",
          },
        ],
      },
    },
  });

  await prisma.driver.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "Dominic Toretto",
      description:
        "Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.",
      car: "Dodge Charger R/T 1970 modificado",
      tax: 5.0,
      min_km: 5,
      Review: {
        create: [
          {
            rating: 4,
            comment:
              "Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!",
          },
        ],
      },
    },
  });

  await prisma.driver.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: "James Bond",
      description:
        "Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.",
      car: "Aston Martin DB5 clássico",
      tax: 10.0,
      min_km: 10,
      Review: {
        create: [
          {
            rating: 5,
            comment:
              "Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.",
          },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    console.log("Seed concluído!");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
