'use client'

import { FaGithub, FaExclamationTriangle, FaClock, FaUser, FaArrowRight, FaCode, FaServer, FaDatabase, FaTools } from 'react-icons/fa'
import { HiOutlineExternalLink } from 'react-icons/hi'
import { MdSecurity } from 'react-icons/md'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d1117] via-[#161b22] to-[#0d1117] text-[#c9d1d9] flex items-center justify-center p-4 md:p-8">
      <div className="max-w-4xl w-full">
        {/* Main Card - No Outline */}
        <div className="bg-[#161b22]/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl shadow-[#000000]/50">
          
          {/* Status Badge - No Outline */}
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-[#30363d]/50">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#da3633] animate-pulse"></span>
              <span className="text-xs font-mono text-[#da3633] font-semibold tracking-[0.2em] uppercase">Permanently Discontinued</span>
            </div>
            <span className="text-xs text-[#8b949e]/50">|</span>
            <span className="text-xs text-[#8b949e]/50">v1.0.0</span>
          </div>

          {/* Icon Area */}
          <div className="w-24 h-24 mb-8 rounded-full bg-[#da3633]/5 flex items-center justify-center">
            <FaExclamationTriangle className="w-11 h-11 text-[#da3633] opacity-80" />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Website Telah Berhenti Permanen
          </h1>

          {/* Subtitle */}
          <p className="text-[#8b949e] text-lg md:text-xl mb-8 leading-relaxed max-w-2xl">
            Pengembangan dihentikan secara permanen karena faktor teknis dan non-teknis yang tidak memungkinkan untuk dilanjutkan.
          </p>

          {/* Detail Box - No Outline */}
          <div className="bg-[#0d1117]/80 rounded-xl p-6 mb-8 space-y-4">
            
            {/* Alasan Utama */}
            <div className="flex items-start gap-4">
              <FaClock className="w-5 h-5 text-[#da3633] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-[#8b949e] leading-relaxed">
                  <span className="text-[#f0f6fc] font-medium block mb-1">Alasan Penghentian:</span>
                  Developer mengalami stres dan kelelahan berkepanjangan dalam menangani error teknis yang kompleks. 
                  Keputusan ini diambil untuk menjaga kesehatan mental dan keseimbangan hidup.
                </p>
              </div>
            </div>

            {/* Tanggal */}
            <div className="flex items-start gap-4">
              <FaCode className="w-5 h-5 text-[#8b949e] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-[#8b949e] leading-relaxed">
                  <span className="text-[#f0f6fc] font-medium block mb-1">Tanggal Penghentian:</span>
                  {new Date().toLocaleDateString('id-ID', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })} - Pukul {new Date().toLocaleTimeString('id-ID', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })} WIB
                </p>
              </div>
            </div>

            {/* Alasan Detail */}
            <div className="flex items-start gap-4">
              <FaTools className="w-5 h-5 text-[#8b949e] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-[#8b949e] leading-relaxed">
                  <span className="text-[#f0f6fc] font-medium block mb-1">Kendala Teknis:</span>
                  Terdapat berbagai error yang tidak terpecahkan pada fitur Browse, Upload, dan Editor. 
                  Setelah berbagai upaya perbaikan, diputuskan untuk menghentikan proyek ini dan fokus ke project lain yang lebih manageable.
                </p>
              </div>
            </div>

            {/* Rekomendasi */}
            <div className="flex items-start gap-4">
              <MdSecurity className="w-5 h-5 text-[#8b949e] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-[#8b949e] leading-relaxed">
                  <span className="text-[#f0f6fc] font-medium block mb-1">Untuk Pengguna:</span>
                  Kami menyarankan untuk menggunakan aplikasi GitHub native atau tools lain yang lebih stabil. 
                  Kami mohon maaf atas ketidaknyamanan ini.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-stretch gap-3">
            <a
              href="https://github.com/alifdiaz257-arch"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#238636] hover:bg-[#2ea043] text-white font-medium rounded-xl transition-all duration-200 text-sm group shadow-lg shadow-[#238636]/20"
            >
              <FaUser className="w-4 h-4" />
              Lihat Profile Developer
              <FaArrowRight className="w-3 h-3 opacity-70 group-hover:translate-x-0.5 transition" />
            </a>
            
            <a
              href="mailto:contact@yourdomain.com"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#21262d] hover:bg-[#30363d] text-white font-medium rounded-xl transition-all duration-200 text-sm"
            >
              <HiOutlineExternalLink className="w-4 h-4" />
              Kontak Developer
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-[#8b949e]/50 border-t border-[#30363d]/30 pt-4">
          <p className="flex items-center justify-center gap-2">
            <span>© {new Date().getFullYear()} GitHub File Manager</span>
            <span className="w-px h-3 bg-[#30363d]/30"></span>
            <span>Project permanently discontinued</span>
            <span className="w-px h-3 bg-[#30363d]/30"></span>
            <span>Thank you for your understanding</span>
          </p>
        </div>
      </div>
    </div>
  )
}
