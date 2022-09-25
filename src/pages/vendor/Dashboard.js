import { useState } from 'react'
import Navigation from '../../components/navigation'
import Header from '../../components/header/Header'
import useScreen from '../../hooks/useScreen'

import VendorNotAuth from '../../components/vendor/NotAuth'
import Products from '../../components/vendor/Products'

const NAV_LINKS = ['Dashboard', 'Contizaciones', 'Ordenes', 'Inventario']

const Dashboard = () => {
  const { width } = useScreen()
  const [currentSection, setCurrentSection] = useState(NAV_LINKS[3])
  const section = { current: currentSection, set: setCurrentSection }

  return (
    <>
      {width >= 1024 && <Header />}

      <div className='dashboard lg:flex'>
        <Navigation section={section} />

        {currentSection.toLocaleLowerCase() === NAV_LINKS[3].toLocaleLowerCase() && <VendorNotAuth />}
      </div>
    </>
  )
}

export default Dashboard