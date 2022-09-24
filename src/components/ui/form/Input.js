import classnames from 'classnames'
const defaultClasses = 'w-full rounded border-2 border-gray-200 focus:border-blue-500 outline-0 transition-all'
const sizes = {
  sm: 'p-2 text-sm',
  lg: 'p-3 text-base'
}

const Input = ({ className, style, type, size = 'sm', name, placeholder, value, onChange, children }) => {
  const classes = classnames(defaultClasses, sizes[size], className)

  return (
    <input className={classes} style={style} type={type} name={name} placeholder={placeholder} value={value} onChange={onChange}>
      {children}
    </input>
  )
}

export default Input