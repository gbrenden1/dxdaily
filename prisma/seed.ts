import { PrismaClient } from '@prisma/client'
import { addDays, startOfToday } from 'date-fns'
import path from 'path'
import { readFileSync } from 'fs'

// 1️⃣ Initialize Prisma
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database from JSON...')

  // 2️⃣ Load JSON data
  const filePath = path.join(process.cwd(), 'data', 'diseases.json')
  const diseases = JSON.parse(readFileSync(filePath, 'utf8')) as {
    disease: string
    symptoms: string[]
  }[]

  // 3️⃣ Collect unique symptoms
  const allSymptoms = [...new Set(diseases.flatMap((d) => d.symptoms))]
  const symptomMap: Record<string, number> = {}

  // 4️⃣ Insert or reuse all symptoms
  for (const s of allSymptoms) {
    const symptom = await prisma.symptom.upsert({
      where: { name: s },
      update: {},
      create: { name: s },
    })
    symptomMap[s] = symptom.id
  }

  // 5️⃣ Insert diseases and link their symptoms
  const diseaseEntries = []
  for (const d of diseases) {
    const disease = await prisma.disease.upsert({
      where: { name: d.disease },
      update: {},
      create: {
        name: d.disease,
        symptoms: {
          connect: d.symptoms.map((s) => ({ id: symptomMap[s] })),
        },
      },
    })
    diseaseEntries.push(disease)
  }

  // 6️⃣ Pre-generate one Challenge per disease (1 per day)
  const start = startOfToday()
  for (let i = 0; i < diseaseEntries.length; i++) {
    const date = addDays(start, i)
    await prisma.challenge.upsert({
      where: { date },
      update: {},
      create: {
        date,
        disease: { connect: { id: diseaseEntries[i].id } },
      },
    })
  }

  console.log(`✅ Seeded ${diseaseEntries.length} diseases and challenges.`)
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
