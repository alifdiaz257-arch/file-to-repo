import { Octokit } from '@octokit/rest'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function GET(req) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const path = searchParams.get('path')

  if (!path) {
    return new Response(JSON.stringify({ error: 'Path is required' }), { status: 400 })
  }

  const octokit = new Octokit({ auth: session.accessToken })

  try {
    const { data } = await octokit.repos.getContent({
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPO,
      path: path,
    })

    if (data.type === 'file') {
      const content = Buffer.from(data.content, 'base64').toString('utf-8')
      return new Response(JSON.stringify({ content }), { status: 200 })
    } else {
      return new Response(JSON.stringify({ error: 'Not a file' }), { status: 400 })
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
}