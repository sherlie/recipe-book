import type { FC } from 'react';
import { Link, useLocation } from 'react-router';
import { activeNavLink, nav, navLink, navList } from './Navbar.css.ts';

export const Navbar = () => {
  return (
   <nav className={nav}>
      <ul className={navList}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/addrecipe">Add Recipe</NavLink>
      </ul>
    </nav>
  );
};

export default Navbar;

const NavLink: FC<{to: string, children: string }> = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <li>
      <Link to={to} className={isActive ? activeNavLink : navLink}>
        {children}
      </Link>
    </li>
  );
};