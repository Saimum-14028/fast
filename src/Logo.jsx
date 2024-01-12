import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <Link to='/'>
      <div className="flex">
          <div className="avatar">
              <div className="w-8 md:w-10 rounded-full">
                  <img src="https://i.ibb.co/CWZ0Rth/pexels-shvets-production-7203788.jpg" alt="logo" />
              </div>
          </div>
          <p className='text-xl md:text-2xl font-semibold ml-1'>Fast</p>
      </div>
    </Link>
  )
}

export default Logo