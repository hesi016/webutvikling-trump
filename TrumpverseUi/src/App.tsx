import React from "react";
import { StaffPage, CreateStaffPage } from "./pages";
import Header from "./component/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StaffProvider } from "./contexts/StaffContext";



const App: React.FC = () => {
  return (

   <BrowserRouter>
   <StaffProvider>
   <Header/>
   <main className="p-6 bg-gray-100 min-h-screen">
   <Routes>
   <Route path="/" element={<StaffPage />}/>
    <Route path="/staffMembers" element={<StaffPage />}/>
    <Route path="/addMember" element={< CreateStaffPage/>}/>
  </Routes>
   </main>
   </StaffProvider>

</BrowserRouter>
  );
};


export default App;