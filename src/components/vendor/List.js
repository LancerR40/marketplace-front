const TABLE_COLS = ['Nombre del producto', 'SKU', 'Cantidad', 'Precio', 'Creación']

const List = ({ products }) => {
  return (
    <div className="whitespace-nowrap overflow-x-auto">
      <table className="w-full border-2 border-gray-100" style={{ minWidth: "768px", borderCollapse: "collapse", borderSpacing: "0" }}>
        <thead>
            <tr className="text-left border-2 border-gray-100">
              {TABLE_COLS.map((col) => <th key={col} className="p-3.5">{col}</th>)}
            </tr>
        </thead>
        <tbody>
          {products.map(({ productId, name, sku, quantity, price, createdAt }) => (
            <tr key={productId} className="border-2 border-gray-100">
              <td className="p-3.5">{name}</td>
              <td className="p-3.5">{sku}</td>
              <td className="p-3.5">{quantity}</td>
              <td className="p-3.5">{price}$</td>
              <td className="p-3.5">{createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default List