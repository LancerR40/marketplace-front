import classnames from 'classnames'

const FormGroup = ({ className, style, children }) => {
  const classes = classnames('mb-5', className)

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  )
}

export default FormGroup