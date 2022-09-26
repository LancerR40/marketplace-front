import { FaUserCircle } from 'react-icons/fa'
import image from '../../assets/image-1.jpg'

const Card = ({ productName, sku, price, vendorName }) => {
  return (
    <div className="border border-gray-200 rounded bg-gray-50 transition-all hover:border-2 hover:border-blue-500 hover:-translate-y-1">
      <div>
        <img src={image} className='object-fit' style={{ width: 250, height: 150 }} />
      </div>

      <div className='p-3 text-gray-700 text-center'>
          <span className='block text-xl font-semibold'>{productName}</span>
          <span className='block my-2 text-lg'>{sku}</span>
          <span className='block text-lg'>${price}</span>

          <div className='mt-3 flex justify-end items-center gap-2'>
            <FaUserCircle className='text-3xl text-gray-700' />
            <span className='text-sm'>{vendorName}</span>
          </div>
        </div>

      </div>
  )
}

export default Card