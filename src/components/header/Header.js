import { H1 } from '../ui'
import { FaUserCircle } from 'react-icons/fa'

const Header = () => {
  return (
    <header className='flex justify-between items-center bg-blue-500 py-3 px-4'>
      <H1 className='text-white'>com.company</H1>
      <div className='flex items-center gap-2 text-white'>
        <FaUserCircle className='text-3xl' />
        <span className='text-sm'>No hay una sesión</span>
      </div>
    </header>
  )
}

export default Header