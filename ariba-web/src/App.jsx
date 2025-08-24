import { Outlet } from "react-router-dom";
function App() {
  return (
    <div className="bg-white min-h-screen">
      <h1 className="text-red-500">Ariba Web</h1>
      <Outlet />
    </div>
  );
}

export default App;
