import { Routes, Route } from "react-router";

function App() {
  return (
    <Routes>
      <Route index element={<>Home</>} />
      <Route element={<>Auth Layout</>}>
        <Route path="login" element={<>Login</>} />
      </Route>
      <Route path="dashboard" element={<>Dashboard Layout</>}>
        <Route index element={<>Dashboard Home</>} />
        <Route path="projects" element={<>Dashboard Projects</>} />
      </Route>
    </Routes>
  );
}

export default App;
