import ArchivesClient from './ArchivesClient'

export default async function Archives() {
  const res = await fetch('http://localhost:3000/api/archives')
  if (!res.ok) {
    throw new Error('Could not fetch archives')
  }
  const archives: string[] = await res.json()

  return <ArchivesClient archives={archives} />
}
