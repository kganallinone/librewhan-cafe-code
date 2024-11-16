export const LoadingProductCard = () => {
  return (
    <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden relative animate-pulse">
      <div className="relative">
        <div className="w-full h-64 bg-gray-300 flex items-center justify-center">
          {/* Placeholder for image */}
          <div className="w-24 h-24 bg-gray-400 rounded-full"></div>
        </div>
      </div>

      <div className="p-4">
        {/* Placeholder for product name */}
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>

        {/* Placeholder for price */}
        <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>

        {/* Placeholder for category or other info */}
        <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>

        <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>

        {/* Placeholder for quantity controls */}
        <div className="mt-4 flex items-center justify-between">
          <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
          <span className="h-4 w-8 bg-gray-300 rounded"></span>
          <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
