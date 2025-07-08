import prisma from "./db.js";

async function main() {

  let user = await prisma.user.findUnique({
    where: { username: "aditya" },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: "aditya@example.com",
        username: "aditya",
        password: "hashed_password", 
      },
    });
  }

  const getDateMonthsAgo = (monthsAgo) => {
    const date = new Date();
    date.setMonth(date.getMonth() - monthsAgo);
    return date;
  };


  await prisma.income.createMany({
    data: [
      { userId: user.id, name: "Salary", amount: 5000, date: getDateMonthsAgo(3) },
      { userId: user.id, name: "Freelance", amount: 1500, date: getDateMonthsAgo(3) },
      { userId: user.id, name: "Salary", amount: 5000, date: getDateMonthsAgo(2) },
      { userId: user.id, name: "Bonus", amount: 1000, date: getDateMonthsAgo(2) },
      { userId: user.id, name: "Salary", amount: 5000, date: getDateMonthsAgo(1) },
      { userId: user.id, name: "Gift", amount: 500, date: getDateMonthsAgo(0) },
    ],
  });

  
  await prisma.expense.createMany({
    data: [
      { userId: user.id, name: "Rent", category: "Housing", amount: 1200, date: getDateMonthsAgo(3) },
      { userId: user.id, name: "Groceries", category: "Food", amount: 400, date: getDateMonthsAgo(3) },
      { userId: user.id, name: "Electricity", category: "Utilities", amount: 300, date: getDateMonthsAgo(2) },
      { userId: user.id, name: "Dining", category: "Food", amount: 200, date: getDateMonthsAgo(2) },
      { userId: user.id, name: "Internet", category: "Utilities", amount: 150, date: getDateMonthsAgo(1) },
      { userId: user.id, name: "Shopping", category: "Misc", amount: 700, date: getDateMonthsAgo(0) },
    ],
  });

  await prisma.debt.createMany({
    data: [
      {
        userId: user.id,
        name: "Car Loan",
        total: 3000,
        dueDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      },
      {
        userId: user.id,
        name: "Credit Card",
        total: 1200,
        dueDate: new Date(new Date().setMonth(new Date().getMonth() + 2)),
      },
    ],
  });

  console.log(" Seeded ");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(" Seed error:", e);
    return prisma.$disconnect();
  });
