import ToggleThemeBtn from "./ToggleThemeBtn";

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between mb-9'>
      <h1>devfinder</h1>
      <ToggleThemeBtn />
    </nav>
  );
};

export default Navbar;
