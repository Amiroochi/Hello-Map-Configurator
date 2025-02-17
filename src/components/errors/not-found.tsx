export function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        <h1 className="text-9xl font-bold text-yellow-500">404</h1>
        <h2 className="text-xl font-bold text-gray-800">
          The requested page does not exists
        </h2>
      </div>
    </div>
  );
}