import { Octokit } from '@octokit/rest'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import formidable from 'formidable'
import fs from 'fs'

export const config = {
  api: {
    bodyParser: false,
  },
}

export async function POST(req) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  const form = new formidable.IncomingForm()
  
  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        resolve(new Response(JSON.stringify({ error: err.message }), { status: 500 }))
        return
      }

      const octokit = new Octokit({ auth: session.accessToken })
      const uploadPath = fields.path || ''
      const fileArray = Array.isArray(files.files) ? files.files : [files.files]

      try {
        for (const file of fileArray) {
          const content = fs.readFileSync(file.filepath, 'base64')
          const path = uploadPath ? `${uploadPath}/${file.originalFilename}` : file.originalFilename

          await octokit.repos.createOrUpdateFileContents({
            owner: process.env.GITHUB_OWNER,
            repo: process.env.GITHUB_REPO,
            path: path,
            message: `Upload ${file.originalFilename}`,
            content: content,
          })
        }

        resolve(new Response(JSON.stringify({ message: 'Files uploaded successfully' }), { status: 200 }))
      } catch (error) {
        resolve(new Response(JSON.stringify({ error: error.message }), { status: 500 }))
      }
    })
  })
}