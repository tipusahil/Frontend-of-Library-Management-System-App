
import {  Outlet} from "react-router";
import "./App.css";
import Navbar from "./assets/Components/common/Navbar";
import { Helmet } from "react-helmet-async";
//  import SplashCursor from './reactsBitsComponents/backgrounds/SplaseCursor'
import Footer from "./assets/Components/common/Footer";
import SplashCursorProps from "@/reactsBitsComponents/backgrounds/SplaseCursor";

function App() {


  return (
 <div className=" wholeApplicationBody min-h-screen flex flex-col">
    {/* -------------------design start end---------- */}
   <Helmet>
        <title> LMS | Home </title>
    </Helmet>

{/* <SplashCursor /> */}

   {/* -------------------design part end------------- */}
   
      <div className="NavbarContainer min-h-screen flex flex-col w-[100%]">
           <SplashCursorProps/>
        {/* ------------------------- */}
   
      <Navbar /> 

      <main className=" centerBody_whichChangeByRoutes flex-grow container mx-auto p-4 ">
  <Outlet /> 
      </main>

      <Footer />
    
        {/* ------------------------- */}
      </div>
    </div>
  )
}

export default App
