import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seed: Nettoyage de la base de données...');
  await prisma.task.deleteMany({});

  console.log('Seed: Insertion des tâches de test...');
  await prisma.task.createMany({
    data: [
      { title: 'Acheter du lait', completed: false },
      { title: 'Envoyer rapport', completed: true },
      { title: 'Réviser le cours SDD', completed: false },
    ],
  });

  console.log('Seed terminé avec succès.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
