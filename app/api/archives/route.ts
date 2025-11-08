export async function GET() {
  // replace with data fetch
  const archives = [...Array(100)].map((_, i) => `challenge #${i + 1}`)
  return new Response(JSON.stringify(archives), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
