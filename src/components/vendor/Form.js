import { H2, FormGroup, Label, Input, Button } from '../ui'
import { useState } from 'react'
import { addProductsAPI } from '../../api/vendor'
import { useAuthContext } from '../../context/Auth'
import toast, { Toaster } from 'react-hot-toast';

const defaultState = {
  name: {
      value: '',
      error: {
        status: false,
        message: ''
      }
    },
    sku: {
      value: '',
      error: {
        status: false,
        message: ''
      }
    },
    quantity: {
        value: '',
        error: {
          status: false,
          message: ''
        }
    },
    price: {
        value: '',
        error: {
          status: false,
          message: ''
        }
    },
  }
  
const inputValidation = (name, value, setInput) => {
    if (name === 'name' && !value) {
      setInput((state) => ({ ...state, name: { ...state.name, error: { ...state.name.error, status: true, message: 'Campo de nombre requerido' } } }))
    }
    
    if (name === 'sku' && (!value || value.length < 5 || value.length > 10)) {
      setInput((state) => ({ ...state, sku: { ...state.sku, error: { ...state.sku.error, status: true, message: 'El SKU debe contener un mínimo de seis(5) y un máximo de diez (10) caracteres' } } }))
    }

    if (name === 'quantity') {
        if (!value) {
          setInput((state) => ({ ...state, quantity: { ...state.quantity, error: { ...state.quantity.error, status: true, message: 'Debes añadir una cantidad' } } }))
        }

        if (!Number(value) === 'NaN') {
          setInput((state) => ({ ...state, quantity: { ...state.quantity, error: { ...state.quantity.error, status: true, message: 'La cantidad debe ser un número' } } }))
        }
    }

    if (name === 'price') {
        if (!value) {
          setInput((state) => ({ ...state, price: { ...state.price, error: { ...state.price.error, status: true, message: 'Debes añadir un precio' } } }))
        }

        if (!Number(value) === 'NaN') {
          setInput((state) => ({ ...state, price: { ...state.price, error: { ...state.price.error, status: true, message: 'El precio debe ser un número' } } }))
        }
    }
}
  
const onSubmitValidation = (input, setInput) => {
    const { name, sku, quantity, price } = input
    let anError = false
  
    if (!name.value) {
      setInput((state) => ({ ...state, name: { ...state.name, error: { ...state.name.error, status: true, message: 'Campo de nombre requerido' } } }))
      anError = true
    }
  
    if (!sku.value) {
      setInput((state) => ({ ...state, sku: { ...state.sku, error: { ...state.sku.error, status: true, message: 'Campo de SKU es requerido' } } }))
      anError = true
    }

    if (!quantity.value) {
        setInput((state) => ({ ...state, quantity: { ...state.quantity, error: { ...state.quantity.error, status: true, message: 'La cantidad es requerida' } } }))
        anError = true
    }

    if (!price.value) {
        setInput((state) => ({ ...state, price: { ...state.price, error: { ...state.price.error, status: true, message: 'El precio es requerido' } } }))
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

const Form = ({ setProduct }) => {
  const { setUserAuth } = useAuthContext()
  const [input, setInput] = useState(defaultState)

  const notify = (type, message) => toast[type](message);

  const onSubmit = async (e) => {
    e.preventDefault()

    if (!onSubmitValidation(input, setInput)) {
      return
    }

    const { name: { value: nameValue }, sku: { value: skuValue }, quantity: { value: quantityValue }, price: { value: priceValue } } = input
    const data = { name: nameValue, sku: skuValue, quantity: quantityValue, price: priceValue }

    const response = await addProductsAPI(data)
  
    if (!response) {
      window.location.href = '/vendor/login'
      return setUserAuth({ auth: false, role: null, name: null })
    }

    if (!response.success) {
      const { message, field } = response.error
      return setInput((state) => ({ ...state, [field]: { ...state[field], error: { ...state[field].error, status: true, message} } }))
    }

    setProduct(response.data.product)
    notify('success', 'Producto registrado')
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setInput((state) => ({ ...state, [name]: { ...state[name], value, error: { ...state[name].error, status: false, message: '' } } }))
    inputValidation(name, value, setInput)
  }

  const anErrorName        = { status: input.name.error.status,     message: input.name.error.message     }
  const anErrorSKU         = { status: input.sku.error.status,      message: input.sku.error.message      }
  const anErrorQuantity    = { status: input.quantity.error.status, message: input.quantity.error.message }
  const anErrorPrice       = { status: input.price.error.status,    message: input.price.error.message    }
  const nameErrorStyle     = anErrorName.status     ? { borderColor: 'red' } : null
  const skuErrorStyle      = anErrorSKU.status      ? { borderColor: 'red' } : null
  const quantityErrorStyle = anErrorQuantity.status ? { borderColor: 'red' } : null
  const priceErrorStyle    = anErrorPrice.status    ? { borderColor: 'red' } : null

  return (
    <div className="flex justify-center">
       <Toaster />

      <form className="py-8 px-4 sm:px-8 w-full max-w-md rounded shadow-sm bg-white" onSubmit={onSubmit}>
        <H2 className="text-center uppercase text-gray-700">Crear producto</H2>

        <div className='mt-2'>
          <FormGroup>
            <Label>Nombre:</Label>
            <Input type='text' name='name' placeholder='Ingresa un nombre de producto...' style={nameErrorStyle} value={input.name.value} onChange={onChange} />

            {anErrorName.status && <span className='block mt-2 text-xs text-red-500'>{anErrorName.message}</span>}
          </FormGroup>

          <FormGroup>
            <Label>SKU:</Label>
            <Input type='text' name='sku' placeholder='Ingresa código SKU de producto...' style={skuErrorStyle} value={input.sku.value} onChange={onChange} />

            {anErrorSKU.status && <span className='block mt-2 text-xs text-red-500'>{anErrorSKU.message}</span>}
          </FormGroup>

          <FormGroup>
            <Label>Cantidad:</Label>
            <Input type='number' name='quantity' placeholder='Ingersa la cantidad del producto...' style={quantityErrorStyle} value={input.quantity.value} onChange={onChange} />

            {anErrorQuantity.status && <span className='block mt-2 text-xs text-red-500'>{anErrorQuantity.message}</span>}
          </FormGroup>

          <FormGroup>
            <Label>Precio:</Label>
            <Input type='number' name='price' placeholder='Ingresa el precio del producto...' style={priceErrorStyle} value={input.price.value} onChange={onChange} />

            {anErrorPrice.status && <span className='block mt-2 text-xs text-red-500'>{anErrorPrice.message}</span>}
          </FormGroup>

          <div className='text-right'>
            <Button className='w-fit px-8 py-3 uppercase' type='submit'>Crear</Button>
          </div>

        </div>
      </form>
    </div>
  )
}

export default Form