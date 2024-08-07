import { FaTasks, FaRegCheckSquare, FaRegClock } from 'react-icons/fa';
import NavItem from './NavItem/NavItem';

interface NavItemType {
  id: number;
  label: string;
  link: string;
  icon: React.ReactNode;
}

const navList: NavItemType[] = [
  { id: 1, label: 'All Tasks', link: '/', icon: <FaTasks className='size-5' /> },
  { id: 2, label: 'Completed Tasks', link: '/completed', icon: <FaRegCheckSquare className='size-5' /> },
  { id: 3, label: 'Expired Tasks', link: '/expired', icon: <FaRegClock className='size-5' /> },
];

const NavList = () => {
  return (
    <div className='mt-24'>
      {navList.map(({ id, label, link, icon }) => (
        <NavItem key={id} label={label} link={link} icon={icon} />
      ))}
    </div>
  );
};

export default NavList;
