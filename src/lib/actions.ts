'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

/**
 * Action serveur pour ajouter une nouvelle tâche.
 * Valide le titre et persiste la tâche en base de données.
 */
export async function addTask(formData: FormData) {
  const title = formData.get('title') as string;

  // Validation
  if (!title || title.trim().length === 0) {
    return { error: 'Le titre ne peut pas être vide' };
  }

  if (title.length > 200) {
    return { error: 'Le titre ne doit pas dépasser 200 caractères' };
  }

  try {
    await prisma.task.create({
      data: {
        title: title.trim(),
        completed: false,
      },
    });

    // Déclenche la revalidation de la page principale pour mettre à jour la liste
    revalidatePath('/');
    return { success: true };
  } catch (e) {
    console.error('Erreur lors de l\'ajout de la tâche:', e);
    return { error: 'Une erreur est survenue lors de l\'ajout de la tâche' };
  }
}

/**
 * Action serveur pour basculer le statut d'une tâche.
 */
export async function toggleTaskStatus(id: string, completed: boolean) {
  try {
    await prisma.task.update({
      where: { id },
      data: { completed },
    });

    revalidatePath('/');
    return { success: true };
  } catch (e) {
    console.error('Erreur lors de la mise à jour du statut:', e);
    return { error: 'Impossible de mettre à jour le statut' };
  }
}
