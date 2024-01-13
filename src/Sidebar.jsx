import { useContext, useState } from 'react'
import Logo from './Logo'
import MenuItem from './MenuItem'
import { AiOutlineBars } from 'react-icons/ai'
import { AuthContext } from './AuthProvider'
import useRole from './useRole'
import AdminMenu from './AdminMenu'
import UserMenu from './UserMenu'
import DeliveryMenMenu from './DeliveryMenMenu'

const Sidebar = () => {
  const [isActive, setActive] = useState(true)

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }

  const { user, logOut } = useContext(AuthContext);
  const [role] = useRole()

  return (
    <>
      {/* Small Screen Navbar */}
      <div className='bg-base-200 flex justify-between md:hidden'>
        <div>
          <div className='block cursor-pointer p-4 font-bold'>
            <Logo></Logo>
          </div>
        </div>
        <button onClick={handleToggle} className='mobile-menu-button p-4 focus:outline-none focus:bg-base-200'><AiOutlineBars className='h-5 w-5'/></button>
      </div>
      {/* Sidebar */}
      <div className={`z-10 md:fixed overflow-x-hidden bg-base-200 md:w-64 w-50 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
        isActive && '-translate-x-full'}  md:translate-x-0  transition duration-200 ease-in-out`}>
        
          <div>
            <div className='w-full flex px-4 py-2 justify-center items-center mx-auto'>
              <Logo></Logo>
            </div>
          </div>

          {/* Nav Items */}
          <div className='flex flex-col justify-between flex-1'>
            {role === 'User' && <UserMenu></UserMenu>}
            {role === 'Delivery Men' && <DeliveryMenMenu></DeliveryMenMenu>}
            {role === 'Admin' && <AdminMenu></AdminMenu>}

            <button onClick={logOut} className='flex w-full items-center px-4 py-2 hover:bg-base-300 transition-colors duration-300 transform'><span className='mx-4 font-medium'>Logout</span>
            </button>
          </div>
        
      </div>
    </>
  )
}

export default Sidebar