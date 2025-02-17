export function AccessDenied() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        <h1 className="text-9xl font-bold text-yellow-500">500</h1>
        <h2 className="text-xl font-bold text-gray-800">
          Internal server error, contact support
        </h2>
      </div>
    </div>
  );
}
