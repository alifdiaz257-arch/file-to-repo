export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-8 h-8 border-4 border-github-border border-t-github-button rounded-full spin"></div>
    </div>
  )
}