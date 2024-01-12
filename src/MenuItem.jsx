import { NavLink } from 'react-router-dom'

const MenuItem = ({ label, address }) => {
  return (
    <NavLink to={address} end className={({ isActive }) =>
        `flex items-center px-4 py-2 transition-colors duration-300 transform  hover:bg-base-300 ${isActive ? 'text-red-500' : ''}`
      }><span className='mx-4 font-medium'>{label}</span>
    </NavLink>
  )
}

export default MenuItem