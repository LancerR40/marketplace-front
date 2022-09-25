import { useState } from 'react'
import { Link } from 'react-router-dom'
import { vendorSignupAPI } from '../../api/vendor'

import { H1, FormGroup, Label, Input, Button } from '../../components/ui'
import toast, { Toaster } from 'react-hot-toast';

const defaultState = {
  name: {
    value: '',
    error: {
      status: false,
      message: ''
    }
  },
  email: {
    value: '',
    error: {
      status: false,
      message: ''
    }
  },
  password: {
    value: '',
    error: {
      status: false,
      message: ''
    }
  },
  repeatedPassword: {
    value: '',
    error: {
      status: false,
      message: ''
    }
  },
}

const inputValidation = (name, value, input, setInput) => {
  if (name === 'name' && !value) {
    setInput((state) => ({ ...state, name: { ...state.name, error: { ...state.name.error, status: true, message: 'Campo de nombre requerido' } } }))
  }

  if (name === 'email') {
    if (!value) {
      setInput((state) => ({ ...state, email: { ...state.email, error: { ...state.email.error, status: true, message: 'Campo de correo requerido' } } }))
    }
  
    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)) {
      setInput((state) => ({ ...state, email: { ...state.email, error: { ...state.email.error, status: true, message: 'El correo es inválido' } } }))
    }
  }
  
  if (name === 'password' && (!value || value.length < 6)) {
    setInput((state) => ({ ...state, password: { ...state.password, error: { ...state.password.error, status: true, message: 'La contraseña debe contener un mínimo de seis(6) caracteres' } } }))

    if (input.repeatedPassword.value.length > 0 && (input.repeatedPassword.value !== value)) {
      setInput((state) => ({ ...state, repeatedPassword: { ...state.repeatedPassword, error: { ...state.repeatedPassword.error, status: true, message: 'La contraseña debe coincidir' } } }))
    }
  }
  
  if (name === 'repeatedPassword' && value !== input.password.value) {
    setInput((state) => ({ ...state, repeatedPassword: { ...state.repeatedPassword, error: { ...state.repeatedPassword.error, status: true, message: 'La contraseña debe coincidir' } } }))
  }
}

const onSubmitValidation = (input, setInput) => {
  const { name, email, password, repeatedPassword } = input
  let anError = false

  if (!name.value) {
    setInput((state) => ({ ...state, name: { ...state.name, error: { ...state.name.error, status: true, message: 'Campo de nombre requerido' } } }))
    anError = true
  }

  if (!email.value) {
    setInput((state) => ({ ...state, email: { ...state.email, error: { ...state.email.error, status: true, message: 'Campo de correo requerido' } } }))
    anError = true
  }

  if (!password.value) {
    setInput((state) => ({ ...state, password: { ...state.password, error: { ...state.password.error, status: true, message: 'La contraseña debe contener un mínimo de seis(6) caracteres' } } }))
    anError = true
  }

  if (!repeatedPassword.value) {
    setInput((state) => ({ ...state, repeatedPassword: { ...state.repeatedPassword, error: { ...state.repeatedPassword.error, status: true, message: 'La contraseña debe coincidir' } } }))
    anError = true
  }

  for (let key in input) {
    if (input[key].error.status) {
      anError = true
      break
    }
  }

  return anError ? false : true
}

const Signup = () => {
  const [input, setInput] = useState(defaultState)

  const notify = (type, message) => toast[type](message);

  const onSubmit = async (e) => {
    e.preventDefault()

    if (!onSubmitValidation(input, setInput)) {
      return
    }

    const { name: { value: nameValue }, email: { value: emailValue }, password: { value: passwordValue } } = input
    const data = { name: nameValue, email: emailValue, password: passwordValue }

    const response = await vendorSignupAPI(data)

    if (!response) {
      return notify('error', 'Ocurrió un error. Por favor intenta más tarde')
    }

    if (!response.success) {
      const { message, field } = response.error
      return setInput((state) => ({ ...state, [field]: { ...state[field], error: { ...state[field].error, status: true, message } } }))
    }

    setInput(defaultState)
    notify('success', response.data.message)
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setInput((state) => ({ ...state, [name]: { ...state[name], value, error: { ...state[name].error, status: false, message: '' } } }))
    inputValidation(name, value, input, setInput)
  }

  const anErrorName                = { status: input.name.error.status,             message: input.name.error.message    }
  const anErrorEmail               = { status: input.email.error.status,            message: input.email.error.message    }
  const anErrorPassword            = { status: input.password.error.status,         message: input.password.error.message }
  const anErrorRepeatedPassword    = { status: input.repeatedPassword.error.status, message: input.repeatedPassword.error.message }
  const nameErrorStyle             = anErrorName.status             ? { borderColor: 'red' } : null
  const emailErrorStyle            = anErrorEmail.status            ? { borderColor: 'red' } : null
  const passwordErrorStyle         = anErrorPassword.status         ? { borderColor: 'red' } : null
  const repeatedPasswordErrorStyle = anErrorRepeatedPassword.status ? { borderColor: 'red' } : null

  return (
    <div className="flex justify-center items-center overflow-auto h-screen bg-gray-100" style={{ minHeight: 640 }}>
      <Toaster />

      <form className="py-8 px-4 sm:px-8 w-full max-w-md rounded shadow-sm bg-white" onSubmit={onSubmit}>
        <H1 className="text-center uppercase text-gray-700">Crear una cuenta</H1>

        <div className='mt-8'>
          <FormGroup>
            <Label>Nombre:</Label>
            <Input type='text' name='name' placeholder='Ingresa tu nombre de vendedor...' style={nameErrorStyle} value={input.name.value} onChange={onChange} />

            {anErrorName.status && <span className='block mt-2 text-xs text-red-500'>{anErrorName.message}</span>}
          </FormGroup>

          <FormGroup>
            <Label>Correo:</Label>
            <Input type='text' name='email' placeholder='example@domain.com' style={emailErrorStyle} value={input.email.value} onChange={onChange} />

            {anErrorEmail.status && <span className='block mt-2 text-xs text-red-500'>{anErrorEmail.message}</span>}
          </FormGroup>

          <FormGroup>
            <Label>Contraseña:</Label>
            <Input type='password' name='password' placeholder='********' style={passwordErrorStyle} value={input.password.value} onChange={onChange} />

            {anErrorPassword.status && <span className='block mt-2 text-xs text-red-500'>{anErrorPassword.message}</span>}
          </FormGroup>

          <FormGroup>
            <Label>Confirmar contraseña:</Label>
            <Input type='password' name='repeatedPassword' placeholder='********' style={repeatedPasswordErrorStyle} value={input.repeatedPassword.value} onChange={onChange} />

            {anErrorRepeatedPassword.status && <span className='block mt-2 text-xs text-red-500'>{anErrorRepeatedPassword.message}</span>}
          </FormGroup>

          <div className='text-center'>
            <Button className='w-fit px-8 py-3 uppercase' type='submit'>Registrarse</Button>
          </div>
        </div>

        <Link className='block underline mt-4 text-center text-lg text-blue-500' to='/vendor/login'>Iniciar sesión</Link>
      </form>
    </div>
  )
}

export default Signup