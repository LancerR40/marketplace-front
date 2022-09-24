import classnames from 'classnames'
const sizes = {
  sm: 'text-sm',
  lg: 'text-base'
}

const Label = ({ className, style, size = 'sm', children }) => {
  const classes = classnames('block mb-2', sizes[size], className)

  return (
    <label className={classes} style={style}>{children}</label>
  )
}

export default Label