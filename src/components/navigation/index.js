import MobileNavigation from './Mobile'
import Sidebar from './Sidebar'
import useScreen from '../../hooks/useScreen'

const Navigation = ({ section }) => {
  const { width } = useScreen()
  return width < 1024 ? <MobileNavigation section={section} /> : <Sidebar section={section}/>
}

export default Navigation