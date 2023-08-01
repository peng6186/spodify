import { useState } from "react";
import { logo } from "../assets";
import { colorLogo } from "../assets";
import { links } from "../assets/constants";
import { NavLink } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import { RiCloseLine } from 'react-icons/ri';

const Navbar = ({handleClick}) => (
  <div className="mt-10">
    {links.map(item => (
      <NavLink key={item.name} to={item.to}
      className="flex justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400"
      onClick={()=> handleClick && handleClick()}>
        <item.icon className="mr-2 w-6 h-6"/>
        {item.name}
      </NavLink>
    ))}
  </div>
)

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <>
    <div className="hidden md:flex flex-col w-[240px] py-10 px-4 bg-[#191624]">
      <img src={colorLogo} alt="logo" className="w-full   object-contain"  />
      <Navbar />
    </div>

     {/* mobile menu */}
     <div className="md:hidden absolute block top-6 right-3 z-20">
      {
        mobileMenuOpen ? 
            <RiCloseLine className="w-7 h-6 text-white mr-2"
            onClick={()=>setMobileMenuOpen(false)}/>
        : <HiOutlineMenu className="h-6 w-6 text-white mr-2 "
        onClick={()=>setMobileMenuOpen(true)}/>
      }
      
     </div>

     <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${mobileMenuOpen ? 'left-0': '-left-full'}`}>
      <img src={colorLogo} alt="logo" className="w-full h-14 object-contain"  />
      <Navbar handleClick={()=>setMobileMenuOpen(false)}/>
    </div>

  </>)
}

export default Sidebar;
