import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { startOfToday } from 'date-fns'

export async function GET() {
  const today = startOfToday()
  const challenges = await prisma.challenge.findMany({
    where: { date: { lt: today }},
    orderBy: { date: 'desc' },
    include: { disease: true },
  })
  return NextResponse.json(challenges)
}
