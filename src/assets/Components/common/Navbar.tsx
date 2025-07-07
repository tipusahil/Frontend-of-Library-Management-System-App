import { ModeToggle } from '@/components/mode-toggle';
import {  NavLink } from 'react-router-dom';
   import GradientText from '../../../reactsBitsComponents/TextAnimations/GradientText'


function Navbar() {

    const sharedNavLinks = <>
                <div className="space-x-4 navlinkActiveBox">
          <NavLink to="/books" className="hover:text-gray-500">All Books</NavLink>
          <NavLink to="/create-book" className="hover:text-gray-500">Add Book</NavLink>
          <NavLink to="/borrowsummary" className="hover:text-gray-500">Borrow Summary</NavLink>
        </div>
    </>

  return (
   <div className=''>
  
<div className="navbar  shadow-sm bg-sky-400/50 navBox">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
     {sharedNavLinks}
      </ul>
    </div>

    <div className="">
   
<GradientText
  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
  animationSpeed={2}
  showBorder={false}
  className="custom-class  "
>
 <span className='p-3'>
  Library Management
 </span>
   
</GradientText>
   </div>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
{sharedNavLinks}
    </ul>
  </div>
  <div className="navbar-end  space-x-2">
     <ModeToggle/>
  <div className= 'rounded-full w-10 h-10 border border-sky-300'>
      <img ></img> 
  </div>
  </div>
</div>
   </div>
  );
}

export default Navbar;