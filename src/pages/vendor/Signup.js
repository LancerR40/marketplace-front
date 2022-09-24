import { H1, FormGroup, Label, Input, Button } from '../../components/ui'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div className="flex justify-center items-center overflow-auto h-screen bg-gray-100" style={{ minHeight: 640 }}>
      <form className="py-8 px-4 sm:px-8 w-full max-w-md rounded shadow-sm bg-white">
        <H1 className="text-center uppercase text-gray-700">Crear una cuenta</H1>

        <div className='mt-8'>
          <FormGroup>
            <Label>Correo:</Label>
            
            <Input type='text' name='email' placeholder='example@domain.com' />
          </FormGroup>

          <FormGroup>
            <Label>Contraseña:</Label>
            <Input type='password' name='password' placeholder='********' />
          </FormGroup>

          <FormGroup>
            <Label>Confirmar contraseña:</Label>
            <Input type='password' name='passwordConfirm' placeholder='********' />
          </FormGroup>

          <div className='text-center'>
            <Button className='w-fit px-8 py-3 uppercase'>Registrarse</Button>
          </div>
        </div>

        <Link className='block underline mt-4 text-center text-lg text-blue-500' to='/'>Iniciar sesión</Link>
      </form>
    </div>
  )
}

export default Signup