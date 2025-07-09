import prisma from "./db.js";

async function main() {
  const user = await prisma.user.upsert({
    where: { username: "aditya" },
    update: {},
    create: {
      email: "aditya@example.com",
      username: "aditya",
      password: "hashed_password"
    }
  });

  // Budget Goals
  await prisma.budgetGoal.createMany({
    data: [
      {
        userId: user.id,
        category: "Food",
        targetAmount: 5000,
        startDate: new Date("2025-07-01"),
        endDate: new Date("2025-07-31")
      },
      {
        userId: user.id,
        category: "Transport",
        targetAmount: 2000,
        startDate: new Date("2025-07-01"),
        endDate: new Date("2025-07-31")
      },
      {
        userId: user.id,
        category: "Entertainment",
        targetAmount: 1500,
        startDate: new Date("2025-07-01"),
        endDate: new Date("2025-07-31")
      }
    ]
  });

  // Saving Goals
  await prisma.savingGoal.createMany({
    data: [
      {
        userId: user.id,
        name: "Emergency Fund",
        targetAmount: 10000,
        currentSaved: 3000,
        deadline: new Date("2025-12-31")
      },
      {
        userId: user.id,
        name: "Vacation",
        targetAmount: 8000,
        currentSaved: 2000,
        deadline: new Date("2025-10-15")
      }
    ]
  });
}

main()
  .then(() => {
    console.log(" Seeded successfully");
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error(" Seed error:", e);
    return prisma.$disconnect();
  });
