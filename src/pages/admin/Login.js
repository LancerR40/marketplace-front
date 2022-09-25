import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuthContext } from '../../context/Auth'
import { adminLoginAPI } from '../../api/auth'

import { H1, FormGroup, Label, Input, Button } from '../../components/ui'
import toast, { Toaster } from 'react-hot-toast';

const defaultState = {
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
}

const inputValidation = (name, value, setInput) => {
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
  }
}

const onSubmitValidation = (input, setInput) => {
  const { email, password } = input
  let anError = false

  if (!email.value) {
    setInput((state) => ({ ...state, email: { ...state.email, error: { ...state.email.error, status: true, message: 'Campo de correo requerido' } } }))
    anError = true
  }

  if (!password.value) {
    setInput((state) => ({ ...state, password: { ...state.password, error: { ...state.password.error, status: true, message: 'La contraseña debe contener un mínimo de seis(6) caracteres' } } }))
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

const Login = () => {
  const navigate = useNavigate()
  const { setUserAuth } = useAuthContext()

  const [input, setInput] = useState(defaultState)

  const notify = (type, message) => toast[type](message);

  const onSubmit = async (e) => {
    e.preventDefault()

    if (!onSubmitValidation(input, setInput)) {
      return
    }

    const { email: { value: emailValue }, password: { value: passwordValue } } = input
    const data = {  email: emailValue, password: passwordValue} 

    const response = await adminLoginAPI(data)

    if (!response) {
      return notify('error', 'Ocurrió un error. Por favor, intenta de nuevo más tarde')
    }

    if (!response.success) {
      const { message, field } = response.error
      return setInput((state) => ({ ...state, [field]: { ...state[field], error: { ...state[field].error, status: true, message } } }))
    }

    const { auth, role, token } = response.data
    navigate("/admin");
    setUserAuth((state) => ({ ...state, auth, role }))
    
    localStorage.setItem("token", token);
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setInput((state) => ({ ...state, [name]: { ...state[name], value, error: { ...state[name].error, status: false, message: '' } } }))
    inputValidation(name, value, setInput)
  }

  const anErrorEmail       = { status: input.email.error.status,    message: input.email.error.message    }
  const anErrorPassword    = { status: input.password.error.status, message: input.password.error.message }
  const emailErrorStyle    = anErrorEmail.status    ? { borderColor: 'red' } : null
  const passwordErrorStyle = anErrorPassword.status ? { borderColor: 'red' } : null

  return (
    <div className="flex justify-center items-center overflow-auto h-screen bg-gray-100" style={{ minHeight: 640 }}>
      <Toaster />

      <form className="py-8 px-4 sm:px-8 w-full max-w-md rounded shadow-sm bg-white" onSubmit={onSubmit}>
        <H1 className="text-center uppercase text-gray-700">Bienvenido</H1>

        <div className='mt-8'>
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

          <div className='text-center'>
            <Button className='w-fit px-8 py-3 uppercase' type='submit'>Continuar</Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login