import { useEffect, useState } from 'react'
import { productsByParamsAPI } from '../../api/buyer'

import Header from "../../components/header/Header"
import { H2, Search } from '../../components/ui'
import Slider from '@material-ui/core/Slider';
import ProductCard from '../../components/product/Card'

const Dashboard = () => {
  const [byText, setByText] = useState('')
  const [priceRange, setPriceRange] =  useState([0, 1000]);
  const [specificPrice, setSpecificPrice] = useState(priceRange[1])
  const [products, setProducts] = useState([])

  useEffect(() => {
    productsByParams()
  }, [byText, specificPrice])

  const productsByParams = async () => {
    const data = { byText, min: priceRange[0], max: priceRange[1] }
    const response = await productsByParamsAPI(data)

    if (response.success) {
      setProducts(response.data.products)
    }
  }
  
  const rangeSelector = (e, newValue) => {
    setPriceRange(newValue)
    setSpecificPrice(priceRange[1] - priceRange[0])
  };

  const resetPriceRange = () => {
    setPriceRange([0, 1000])
    setSpecificPrice(1000)
  }

  const byTextOnChange = (e) => {
    setByText(e.target.value)
  }

  

  return (
    <div>
      <Header />

      <div className='p-3'>
        <H2 className="text-gray-700">Comprador</H2>
      </div>

      <div className="p-3 lg:flex lg:gap-10">
        <div className="buyer-filter-box border-b pb-5">
          <div className='flex justify-between items-center pr-3'>
              <span className='text-gray-700 text-xl'>Filtros</span>
              <span className='text-red-500 underline cursor-pointer' onClick={resetPriceRange}>Borrar</span>
            </div>
            
            <div className='mt-3 flex gap-5 flex-wrap'>
              <div className="mt-3 text-right w-full">
                <span className="text-blue-500 text-lg">${specificPrice}</span>
              </div>
              <Slider
                value={priceRange}
                onChange={rangeSelector}
                min={0}
                max={1000}
                valueLabelDisplay="auto"
              />
              <div className='w-full flex justify-between text-gray-700 text-lg'>
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
        </div>

        <div className="buyer-container">
          <div className="border-b-4 border-gray-100 pb-5">
            <Search className="text-gray-700" placeholder="Buscar por nombre y/o SKU..." value={byText} onChange={byTextOnChange} />
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