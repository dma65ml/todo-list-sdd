import prisma from "@/lib/prisma";
import TaskList from "@/components/TaskList";

/**
 * Page principale de l'application affichant la liste des tâches.
 * Récupère les données côté serveur via Prisma.
 */
export default async function Home() {
  // Récupération des tâches triées par date de création (ascendant)
  const tasks = await prisma.task.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Ma Liste de Tâches
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Gérez vos activités quotidiennes efficacement.
          </p>
        </header>

        <main>
          <TaskList tasks={tasks} />
        </main>

        <footer className="mt-12 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Todo List SDD - Propulsé par Next.js & Prisma
        </footer>
      </div>
    </div>
  );
}
