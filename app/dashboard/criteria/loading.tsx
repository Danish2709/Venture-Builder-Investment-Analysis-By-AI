export default function CriteriaLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-6">
            <div className="w-12 h-12 border-2 border-gray-200 border-t-purple-500 rounded-full animate-spin"></div>
          </div>
          <h3 className="text-lg font-light text-gray-900 mb-2 tracking-tight">Loading Investment Criteria</h3>
          <p className="text-sm text-gray-600">Preparing your settings</p>
        </div>
      </div>
    </div>
  )
}
