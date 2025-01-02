import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function runMigration() {
  // Adiciona um novo campo para todos os documentos existentes
  const updatedClients = await prisma.client.updateMany({
    data: {
      newField: "Valor padrão", // Adicione o campo manualmente
    },
  });
  console.log("Migração concluída:", updatedClients);

  await prisma.$disconnect();
}

runMigration().catch((e) => {
  console.error(e);
  process.exit(1);
});
