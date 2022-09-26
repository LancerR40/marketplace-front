import { useState, useEffect } from 'react'
import { vendorsAPI, productByVendorIdsAPI } from '../../api/admin'
import { useAuthContext } from '../../context/Auth'
import { useNavigate } from 'react-router-dom'

import Header from '../../components/header/Header'
import ProductCard from '../../components/product/Card'
import { H2 } from '../../components/ui'
import { FaUserCircle } from 'react-icons/fa'
import { MdCancel } from 'react-icons/md'

import image from '../../assets/image-1.jpg'

const Dashboard = () => {
  const { setUserAuth } = useAuthContext()
  const navigate = useNavigate()

  const [vendors, setVendors] = useState([])
  const [vendorIds, setVendorIds] = useState([])
  
  const [products, setProducts] = useState([])

  // show more vendors logic
  const [maxNum, setMaxNum] = useState(5)
  const [minNum, setMinNum] = useState(0)
  const maxOfVendors = vendors.length
  const remainingVendors = maxOfVendors - maxNum

  useEffect(() => {
    getVendors()
  }, [])

  useEffect(() => {
    productByVendorIds()
  }, [vendorIds])

  const showMoreVendors = () => {
    if (remainingVendors === 0) {
      return
    }

    setMaxNum((state) => state + remainingVendors)
  }

  const productByVendorIds = async () => {
    const data = { vendors: vendorIds }
    const response = await productByVendorIdsAPI(data)

    if (!response) {
      window.location.href = '/admin/login'
      return setUserAuth({ auth: false, role: null, name: null })
    }

    if (response.success) {
      setProducts(response.data.products)
    }
  }

  const onChange = (e) => {
    const { value, checked } = e.target

    if (checked) {
      return setVendorIds((state) => [...state, value])
    }

    setVendorIds((state) => state.filter((elem) => elem !== value))
  }

  const getVendors = async () => {
    const response = await vendorsAPI()

    if (!response) {
      window.location.href = '/admin/login'
      return setUserAuth({ auth: false, role: null, name: null })
    }

    if (response.success) {
      setVendors(response.data.vendors)
    }
  }

  const logout = () => {
    navigate('/admin/login')
    localStorage.removeItem('token')
    return setUserAuth({ auth: false, role: null, name: null })
  }

  const removeItemFromFilter = (id) => {
    setVendorIds((state) => state.filter(item => item != id))
    document.getElementById(`checkbox-${id}`).checked = false
  }

  const removeAllItemsFromFilter = () => {
    for (let i = 0; i < vendorIds.length; i++) {
      removeItemFromFilter(vendorIds[i])
    }
  }

  return (
    <div>
      <Header />

      <div className='p-3'>
        <H2 className="text-gray-700">Administrador</H2>
      </div>

      <div className='p-3 lg:flex'>
        <div className='admin-filter-box border-b pb-5'>
          <div className='flex justify-between items-center pr-3'>
            <span className='text-gray-700 text-xl'>Filtros</span>
            <span className='text-red-500 underline cursor-pointer pr-5' onClick={removeAllItemsFromFilter}>Borrar</span>
          </div>
          
          <div className='mt-3 flex gap-5 flex-wrap lg:flex-col'>
            {vendors.slice(minNum, maxNum).map(({ vendorId, name }) => (
              <div key={vendorId} className='flex items-center gap-2'>
                <input id={`checkbox-${vendorId}`} type="checkbox" value={vendorId} onChange={onChange} />
                <span className='text-gray-700 text-sm'>{name}</span>
              </div>
            ))}
           
          </div>
          <div className='text-right'>
            <span className='block mt-5 text-blue-500 underline cursor-pointer pr-5' onClick={showMoreVendors}>Ver más({remainingVendors})</span>
          </div>
          <span className='block mt-5 text-blue-500 underline cursor-pointer' onClick={logout}>Cerrar sesión</span>
        </div>
            
        <div>
          <div className='hidden lg:flex gap-4 py-5'>
              {vendorIds.map((id) => {
                const { name } = vendors.find(({ vendorId }) => vendorId == id)
                return (
                  <div key={id} className='p-5 bg-gray-100 rounded text-sm text-gray-700 flex flex-wrap items-center gap-2' onClick={() => removeItemFromFilter(id)}>
                    {name}
                    <MdCancel className='text-red-500 text-xl cursor-pointer shadow' />
                  </div>
                )
              })}
          </div>
          <div className='py-4 flex items-center flex-col gap-5 lg:flex-row lg:flex-wrap lg:gap-10'>
            {products.map(({ productId, productName, sku, price, vendorName }) => (
              <ProductCard key={productId} {...{ productName, sku, price, vendorName }}  />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard