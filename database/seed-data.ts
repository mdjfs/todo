interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

interface SeedData {
  entries: SeedEntry[];
}

export const seedData: SeedData = {
  entries: [
    {
      description: "Pendiente: Lorep ipsum Lorep ipsum Lorep ipsum Lorep ipsum",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description:
        "En Progreso: Lorep ipsum 32 Lorep ipsum Lorep ipsum Lorep ipsum",
      status: "in-progress",
      createdAt: Date.now() - 1000000,
    },
    {
      description:
        "Terminada: Lorep ipsum  54 Lorep ipsum Lorep ipsum Lorep ipsum",
      status: "finished",
      createdAt: Date.now() - 100000,
    },
  ],
};
