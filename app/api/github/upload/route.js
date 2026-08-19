import { Octokit } from '@octokit/rest'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'

// ✅ Konfigurasi untuk Next.js 14 App Router
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req) {
  try {
    // 1. Cek session
    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized - Please sign in' }),
        { status: 401 }
      )
    }

    // 2. Parse FormData
    const formData = await req.formData()
    const files = formData.getAll('files')
    const uploadPath = formData.get('path') || ''

    // 3. Validasi
    if (!files || files.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No files provided' }),
        { status: 400 }
      )
    }

    // 4. Upload ke GitHub
    const octokit = new Octokit({ auth: session.accessToken })
    const results = []

    for (const file of files) {
      // Baca file
      const buffer = Buffer.from(await file.arrayBuffer())
      const content = buffer.toString('base64')
      
      // Tentukan path
      const path = uploadPath ? `${uploadPath}/${file.name}` : file.name

      try {
        // Cek apakah file sudah ada
        let sha
        try {
          const { data } = await octokit.repos.getContent({
            owner: process.env.GITHUB_OWNER,
            repo: process.env.GITHUB_REPO,
            path: path,
          })
          sha = data.sha
        } catch (err) {
          // File belum ada, lanjutkan
        }

        // Upload/Update file
        const result = await octokit.repos.createOrUpdateFileContents({
          owner: process.env.GITHUB_OWNER,
          repo: process.env.GITHUB_REPO,
          path: path,
          message: sha ? `Update ${file.name}` : `Upload ${file.name}`,
          content: content,
          sha: sha,
        })

        results.push({
          name: file.name,
          path: path,
          success: true,
          sha: result.data.content.sha,
        })
      } catch (error) {
        results.push({
          name: file.name,
          path: path,
          success: false,
          error: error.message,
        })
      }
    }

    // 5. Return response
    const successCount = results.filter(r => r.success).length
    const failCount = results.filter(r => !r.success).length

    return new Response(
      JSON.stringify({
        message: `${successCount} file(s) uploaded successfully${failCount > 0 ? `, ${failCount} failed` : ''}`,
        results: results,
      }),
      { status: 200 }
    )

  } catch (error) {
    console.error('Upload error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Internal server error' 
      }),
      { status: 500 }
    )
  }
}
