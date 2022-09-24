import classnames from 'classnames'

const weights = {
  'bold': 'font-bold',
  'normal': 'font-normal'
}

const H2 = ({ className, style, weight = 'bold', children }) => {
  const classes = classnames('text-2xl', weights[weight], className)

  return (
    <h1 className={classes} style={style}>{children}</h1>
  )
}

export default H2