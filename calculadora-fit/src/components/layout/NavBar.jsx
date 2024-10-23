
const Navbar = () => {
 
  return (
    <nav className="w-full flex items-center justify-between bg-black text-white px-8 lg:px-12 py-4">
      <div className="flex justify-center items-center gap-2">


      <img
      src="/mancuernas.png" 
      width={40}
      height={40}/>
      <p className="text-2xl">
        Calculadora HB
      </p>
      
      </div>
     
    </nav>
  );
};

export default Navbar;
