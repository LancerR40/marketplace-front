import { useState } from 'react'
import classNames from 'classnames'

import { H1 } from '../../components/ui'
import { GoThreeBars } from 'react-icons/go'

const NAV_LINKS = ['Dashboard', 'Contizaciones', 'Ordenes', 'Inventario'] 

const Mobile = ({ current = 'dashboard', setCurrent }) => {
  const [isOpen, setIsOpen] = useState(false)

  const onClick = () => setIsOpen(!isOpen)

  const navHandler = (link) => {
    setIsOpen(!isOpen)
    // setCurrent(link)
  }

  const navClasses = classNames('mobile-nav absolute z-50 w-full bg-blue-500', {
    'active': isOpen === true
  })

  return (
    <div className='relative flex justify-between items-center px-4 py-3 bg-blue-500'>
      <H1 className='text-white'>com.company</H1>

      <nav className={navClasses}>
        <ul className='grid grid-col-1 gap-2'>
          {NAV_LINKS.map((link) => {
            const classes = classNames('text-center text-white p-3 cursor-pointer', {
              'bg-blue-600': current === link.toLocaleLowerCase()
            })
            return (
              <div key={link} className={classes} onClick={() => navHandler(link.toLocaleLowerCase())}>{link}</div>
            )
          })}
        </ul>
      </nav>

      <div>
        <GoThreeBars className='text-3xl text-white cursor-pointer' onClick={onClick} />
      </div>
    </div>
  )
}

export default Mobile