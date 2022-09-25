import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/Auth'
const NAV_LINKS = ['Dashboard', 'Contizaciones', 'Ordenes', 'Inventario', 'Salir'] 

const Sidebar = ({ section }) => {
  const navigate = useNavigate()
  const { userAuth: { auth }, setUserAuth } = useAuthContext()

  const onClick = (item) => {
    if (item === NAV_LINKS[4].toLocaleLowerCase()) {
      navigate('/vendor/login')
      localStorage.removeItem('token')
      return setUserAuth({ auth: false, role: null, name: null })
    }

    section.set(item)
  }
  
  return (
    <div className="sidebar flex flex-col gap-6 p-4 bg-blue-500">
      {NAV_LINKS.map((link) => {
        if (link === NAV_LINKS[4] && !auth) {
          return null
        }

        const classes = classNames('w-0.5 mr-2 transition-all h-full', {
          'bg-white': link.toLocaleLowerCase() === section.current.toLocaleLowerCase()
        })
        return (
          <div key={link} className='flex items-center text-white h-8 cursor-pointer' onClick={() => onClick(link.toLocaleLowerCase())}>
            <span className={classes}></span>
            <span className='text-sm'>{link}</span>
          </div>
        )
      })}
    </div>
  )
}

export default Sidebar