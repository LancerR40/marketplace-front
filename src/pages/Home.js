import { H1, Button } from '../components/ui'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  const goToPage = (name) => {
    navigate(`/${name}`)
  }

  return (
    <div className="flex justify-center items-center overflow-auto h-screen bg-gray-100" style={{ minHeight: 640 }}>
      <div className="py-8 px-4 sm:px-8 w-full max-w-md rounded shadow-sm bg-white">
        <H1 className="text-center  text-gray-700">Bienvenido, deseas ingresar como:</H1>
        <Button className='px-8 py-3 uppercase mt-5' type='submit' style={{ backgroundColor: '#3582F6' }} onClick={() => goToPage('vendor')}>Vendedor</Button>
        <Button className='px-8 py-3 uppercase my-5' type='submit' style={{ backgroundColor: '#6F74E3' }} onClick={() => goToPage('buyer')}>Comprador</Button>
        <Button className='px-8 py-3 uppercase'      type='submit' style={{ backgroundColor: '#434656' }} onClick={() => goToPage('admin/login')}>Administrador</Button>
      </div>
    </div>
  )
}

export default Home