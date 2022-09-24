import classnames from 'classnames'
const defaultClasses = 'rounded transition-all w-full text-base'
const sizes = {
  sm: "p-2",
  lg: "p-3",
};
const colors = {
  primary: "bg-blue-500 text-white hover:bg-blue-600",
  success: "bg-green-500 text-white hover:bg-green-600",
};

const Button = ({ className, style, size = 'sm', color = 'primary', onClick, children }) => {
  const classes = classnames(defaultClasses, sizes[size], colors[color], className)

  return (
    <button className={classes} style={style} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button