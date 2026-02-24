import 'dotenv/config';
import prisma from '../src/lib/prisma';

async function verifyDeleteTask() {
  console.log('--- Vérification de la suppression de tâche ---');

  // 1. Créer une tâche temporaire
  const title = 'Tâche temporaire à supprimer';
  const task = await prisma.task.create({
    data: { title, completed: false },
  });
  console.log(`✓ Tâche créée: "${title}" (ID: ${task.id})`);

  // 2. Supprimer la tâche
  await prisma.task.delete({
    where: { id: task.id },
  });
  console.log('✓ Appel de suppression Prisma effectué');

  // 3. Vérifier en base
  const deletedTask = await prisma.task.findUnique({
    where: { id: task.id },
  });

  if (!deletedTask) {
    console.log('✓ La tâche n\'existe plus en base de données');
  } else {
    throw new Error('✗ La tâche existe toujours après suppression');
  }

  console.log('--- Toutes les vérifications sont terminées ---');
}

verifyDeleteTask()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
