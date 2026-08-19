import { FaFolder, FaFile, FaFileCode, FaImage, FaFilePdf, FaFileArchive } from 'react-icons/fa'

export function FileIcon({ file }) {
  if (file.type === 'dir') {
    return <FaFolder className="text-blue-400" />
  }
  
  const ext = file.name?.split('.').pop()?.toLowerCase()
  
  const iconMap = {
    'js': <FaFileCode className="text-yellow-400" />,
    'jsx': <FaFileCode className="text-yellow-400" />,
    'ts': <FaFileCode className="text-blue-400" />,
    'tsx': <FaFileCode className="text-blue-400" />,
    'py': <FaFileCode className="text-green-400" />,
    'java': <FaFileCode className="text-red-400" />,
    'html': <FaFileCode className="text-orange-400" />,
    'css': <FaFileCode className="text-purple-400" />,
    'json': <FaFileCode className="text-yellow-400" />,
    'jpg': <FaImage className="text-green-400" />,
    'jpeg': <FaImage className="text-green-400" />,
    'png': <FaImage className="text-green-400" />,
    'gif': <FaImage className="text-green-400" />,
    'svg': <FaImage className="text-green-400" />,
    'pdf': <FaFilePdf className="text-red-400" />,
    'zip': <FaFileArchive className="text-orange-400" />,
    'rar': <FaFileArchive className="text-orange-400" />,
    'tar': <FaFileArchive className="text-orange-400" />,
    'gz': <FaFileArchive className="text-orange-400" />,
  }
  
  return iconMap[ext] || <FaFile className="text-github-secondary" />
}