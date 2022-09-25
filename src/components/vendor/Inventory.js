import { useState, useEffect } from 'react'
import classNames from 'classnames'
import { useAuthContext } from '../../context/Auth'
import { productsAPI } from '../../api/vendor'

import { Button } from '../ui'
import { MdArrowBackIosNew } from 'react-icons/md'
import List from './List'
import Form from './Form'

const Inventory = () => {
  const { setUserAuth } = useAuthContext()
  const [section, setSection] = useState('list')
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    const response = await productsAPI()

    if (!response) {
      window.location.href = '/vendor/login'
      return setUserAuth({ auth: false, role: null, name: null })
    }

    if (response.success) {
      setProducts(response.data.products)
    }
  }

  const sectionHandler = (section) => {
    setSection(section)
  }

  const setProduct = (product) => {
    setProducts((state) => [...state, product])
  }

  const backButtonClasses = classNames('flex items-center gap-1 w-fit px-5 py-3', {
    'transition-none invisible': section === 'list'
  })
  const createButtonClasses = classNames('w-32 py-3 text-center', {
    'transition-none invisible': section === 'form'
  })

  return (
    <div className="p-3 w-full lg:max-w-4xl">
      <div className='h-12 flex items-center justify-between'>
        <Button className={backButtonClasses} onClick={() => sectionHandler('list')}>
          <MdArrowBackIosNew /> Regresar
        </Button>

        <Button className={createButtonClasses} onClick={() => sectionHandler('form')}>
          Crear
        </Button>
      </div>

      <div className='mt-5'>
        {section === 'list' ? <List products={products} /> : <Form setProduct={setProduct} />}
      </div>
    </div>
  )
}

export default Inventory