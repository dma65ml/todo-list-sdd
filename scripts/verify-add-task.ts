import 'dotenv/config';
import prisma from '../src/lib/prisma';

async function verifyAddTask() {
  console.log('--- Vérification de la création de tâche ---');

  const testTitle = 'Tâche de test ' + Date.now();

  // Test 1: Création valide
  console.log(`Test 1: Création d'une tâche avec le titre "${testTitle}"`);
  const task = await prisma.task.create({
    data: {
      title: testTitle,
      completed: false,
    },
  });

  if (task.title === testTitle) {
    console.log('✓ Tâche créée avec succès en base de données');
  } else {
    throw new Error('✗ Le titre de la tâche ne correspond pas');
  }

  // Test 2: Validation (Simulation de la logique de l'action)
  console.log('Test 2: Validation titre vide');
  const validate = (t: string) => {
    if (!t || t.trim().length === 0) return 'Le titre ne peut pas être vide';
    if (t.length > 200) return 'Le titre ne doit pas dépasser 200 caractères';
    return null;
  };

  const emptyError = validate('   ');
  if (emptyError === 'Le titre ne peut pas être vide') {
    console.log('✓ Validation titre vide OK');
  } else {
    throw new Error('✗ Validation titre vide en échec');
  }

  console.log('Test 3: Validation titre trop long');
  const longTitle = 'a'.repeat(201);
  const longError = validate(longTitle);
  if (longError === 'Le titre ne doit pas dépasser 200 caractères') {
    console.log('✓ Validation titre trop long OK');
  } else {
    throw new Error('✗ Validation titre trop long en échec');
  }

  console.log('--- Toutes les vérifications sont terminées ---');
}

verifyAddTask()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
