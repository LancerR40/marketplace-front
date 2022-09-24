import image from '../../assets/image-1.jpg'

import { useState } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames';

import { H2, Button } from '../ui'
import { Modal } from 'react-responsive-modal';

const NotAuth = () => {
  const [open, setOpen] = useState(false);

  const onOpenModal  = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const defaultButtonClasses = 'text-white rounded transition-all w-full text-sm p-2 text-center uppercase'
  const loginButton = classNames(defaultButtonClasses, 'bg-gray-500 hover:bg-gray-600')
  const signupButton = classNames(defaultButtonClasses, 'bg-blue-500 hover:bg-blue-600 ')

  return (
    <>
      <Modal classNames={{ modal: 'customModal' }} open={open} onClose={onCloseModal} center>
        <div className='p-3 border-b-2 text-gray-700'>
          <span className='text-2xl'>Crear una cuenta</span>
        </div>
        <p className='p-3'>
          Registrate o inicia sesión para empezar <br /> a agregar productos a tu inventario.
        </p>
        <div className='flex justify-end gap-2 p-3'>
          <Link className={loginButton}  style={{ width: 110 }} to='/vendor/login'>Inicia sesión</Link>
          <Link className={signupButton} style={{ width: 110 }} to='/vendor/signup'>Registrate</Link>
        </div>
      </Modal>

      <div className="vendor-not-auth lg:p-4 flex justify-center items-center">
        <div className='lg:flex w-full lg:flex lg:justify-center lg:gap-8'>
          <div>
            <img src={image} className="vendor-not-auth-img object-cover lg:rounded" alt='Productos' />
          </div>

          <div className='flex justify-center p-5'>
            <div className='vendor-not-auth-content'>
              <div className='text-gray-700 text-center lg:text-left'>
                <H2 className='vendor-not-auth-title'>Crea tu <span>producto</span></H2>
                <span className='vendor-not-auth-text block mt-3 text-lg'>Organiza de manera <span>profesional tu inventario</span></span>
              </div>

              <div className='mt-8 flex justify-between items-center'>
                <Link className='block underline text-lg text-blue-500' to='/vendor/login'>Conocer más</Link>
                <Button className='uppercase w-fit' onClick={onOpenModal}>Crear un producto</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotAuth