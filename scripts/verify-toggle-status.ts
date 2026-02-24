import 'dotenv/config';
import prisma from '../src/lib/prisma';

async function verifyToggleStatus() {
  console.log('--- Vérification de la modification du statut ---');

  // 1. Trouver une tâche existante
  const tasks = await prisma.task.findMany({ take: 1 });
  if (tasks.length === 0) {
    throw new Error('Aucune tâche trouvée pour le test. Lancez le seed.');
  }

  const task = tasks[0];
  const originalStatus = task.completed;
  const targetStatus = !originalStatus;

  console.log(`Tâche cible: "${task.title}" (ID: ${task.id})`);
  console.log(`Statut original: ${originalStatus} -> Cible: ${targetStatus}`);

  // 2. Simuler la mise à jour (comme dans l'action toggleTaskStatus)
  await prisma.task.update({
    where: { id: task.id },
    data: { completed: targetStatus },
  });

  // 3. Vérifier en base
  const updatedTask = await prisma.task.findUnique({ where: { id: task.id } });
  
  if (updatedTask?.completed === targetStatus) {
    console.log('✓ Statut mis à jour avec succès en base de données');
  } else {
    throw new Error('✗ Échec de la mise à jour du statut en base');
  }

  // 4. Remettre le statut original (nettoyage optionnel)
  await prisma.task.update({
    where: { id: task.id },
    data: { completed: originalStatus },
  });
  console.log('✓ Statut original restauré');

  console.log('--- Toutes les vérifications sont terminées ---');
}

verifyToggleStatus()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
