'use client'

import { FaGithub, FaExclamationTriangle, FaClock, FaUser, FaArrowRight, FaCode } from 'react-icons/fa'
import { HiOutlineExternalLink } from 'react-icons/hi'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Main Card */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-8 md:p-12 shadow-lg">
          
          {/* Status Badge */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#30363d]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#da3633] animate-pulse"></span>
              <span className="text-xs font-mono text-[#da3633] font-semibold tracking-wider">INACTIVE</span>
            </div>
            <span className="text-xs text-[#8b949e]">|</span>
            <span className="text-xs text-[#8b949e]">v1.0.0</span>
          </div>

          {/* Icon */}
          <div className="w-20 h-20 mb-6 rounded-full bg-[#da3633]/10 border border-[#da3633]/20 flex items-center justify-center">
            <FaExclamationTriangle className="w-9 h-9 text-[#da3633]" />
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            Website Telah Berhenti
          </h1>

          {/* Description */}
          <p className="text-[#8b949e] text-base mb-6 leading-relaxed">
            Pengembangan dihentikan sementara. Kami akan kembali dengan pengalaman yang lebih baik.
          </p>

          {/* Alasan Box */}
          <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <FaClock className="w-4 h-4 text-[#8b949e] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-[#8b949e] leading-relaxed">
                  <span className="text-[#f0f6fc] font-medium">Alasan:</span>
                  <br />
                  Developer mengalami stres dan kelelahan dalam menangani error teknis.
                  <br />
                  <span className="text-xs text-[#8b949e] mt-1 block">
                    Aplikasi akan dilanjutkan setelah kondisi membaik.
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#8b949e] mb-8">
            <div className="flex items-center gap-2">
              <FaCode className="w-4 h-4" />
              <span>Berhenti: {new Date().toLocaleDateString('id-ID', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}</span>
            </div>
            <div className="w-px h-4 bg-[#30363d] hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <FaGithub className="w-4 h-4" />
              <a 
                href="https://github.com/alifdiaz257-arch" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#58a6ff] hover:underline transition"
              >
                @alifdiaz257-arch
              </a>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-stretch gap-3">
            <a
              href="https://github.com/alifdiaz257-arch"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#238636] hover:bg-[#2ea043] text-white font-medium rounded-lg transition text-sm group"
            >
              <FaUser className="w-4 h-4" />
              Lihat Profile
              <FaArrowRight className="w-3 h-3 opacity-70 group-hover:translate-x-0.5 transition" />
            </a>
            
            <a
              href="mailto:contact@yourdomain.com"
              className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#21262d] hover:bg-[#30363d] text-white font-medium rounded-lg transition text-sm group"
            >
              <HiOutlineExternalLink className="w-4 h-4" />
              Kontak Developer
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-[#8b949e] border-t border-[#30363d] pt-4">
          <p className="flex items-center justify-center gap-2">
            <span>© {new Date().getFullYear()} GitHub File Manager</span>
            <span className="w-px h-3 bg-[#30363d]"></span>
            <span>Project paused</span>
          </p>
        </div>
      </div>
    </div>
  )
}
