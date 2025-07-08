import prisma from "./db.js"

async function main() {
  
  const user = await prisma.user.create({
    data: {
      email: "demo@example.com",
      username: "demo",
      password: "hashed_password" 
    }
  })

  
  await prisma.income.createMany({
    data: [
      { userId: user.id, name: "Salary", amount: 5000, date: new Date() },
      { userId: user.id, name: "Freelance", amount: 1200, date: new Date() }
    ]
  })

  
  await prisma.expense.createMany({
    data: [
      { userId: user.id, name: "Groceries", category: "Food", amount: 300, date: new Date() },
      { userId: user.id, name: "Rent", category: "Housing", amount: 1000, date: new Date() }
    ]
  })
}

main()
  .then(() => {
    console.log(' Seeded successfully')
    return prisma.$disconnect()
  })
  .catch((e) => {
    console.error(' Seed error:', e)
    return prisma.$disconnect()
  })
