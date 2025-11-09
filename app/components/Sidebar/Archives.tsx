import ArchivesClient from './ArchivesClient'

export default async function Archives() {
  const res = await fetch('http://localhost:3000/api/challenges')
  if (!res.ok) {
    throw new Error('Could not fetch archives')
  }
  const archives: string[] = (await res.json()).map((challenge: { date: string }) =>
    new Date(challenge.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  )

  return <ArchivesClient archives={archives} />
}
