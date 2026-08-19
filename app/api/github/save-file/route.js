import { Octokit } from '@octokit/rest'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function POST(req) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  const { path, content, message } = await req.json()
  const octokit = new Octokit({ auth: session.accessToken })

  try {
    // Get current file SHA for update
    let sha
    try {
      const { data } = await octokit.repos.getContent({
        owner: process.env.GITHUB_OWNER,
        repo: process.env.GITHUB_REPO,
        path: path,
      })
      sha = data.sha
    } catch (error) {
      // File doesn't exist, will create new
    }

    await octokit.repos.createOrUpdateFileContents({
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPO,
      path: path,
      message: message || `Update ${path}`,
      content: Buffer.from(content).toString('base64'),
      sha: sha,
    })

    return new Response(JSON.stringify({ message: 'File saved successfully' }), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
}