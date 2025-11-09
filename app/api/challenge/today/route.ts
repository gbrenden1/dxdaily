import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Try to find today’s challenge
  let challenge = await prisma.challenge.findUnique({
    where: { date: today },
    include: { disease: { include: { symptoms: true } } },
  })

  if (!challenge) {
    // Pick a random unused disease
    const unusedCount = await prisma.disease.count({ where: { used: false } })
    if (unusedCount === 0) {
      await prisma.disease.updateMany({ data: { used: false } })
    }

    const randomDisease = await prisma.disease.findMany({
      where: { used: false },
      take: 1,
      skip: Math.floor(Math.random() * unusedCount),
    })

    const selected = randomDisease[0]

    // Mark as used and create the challenge
    challenge = await prisma.challenge.create({
      data: {
        date: today,
        disease: { connect: { id: selected.id } },
      },
      include: { disease: { include: { symptoms: true } } },
    })

    await prisma.disease.update({
      where: { id: selected.id },
      data: { used: true },
    })
  }

  return NextResponse.json(challenge)
}
