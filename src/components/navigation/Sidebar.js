import classNames from 'classnames'
const NAV_LINKS = ['Dashboard', 'Contizaciones', 'Ordenes', 'Inventario'] 

const Sidebar = ({ section }) => {
  const onClick = (item) => section.set(item)
  
  return (
    <div className="sidebar flex flex-col gap-6 p-4 bg-blue-500">
      {NAV_LINKS.map((link) => {
        const classes = classNames('w-0.5 mr-2 transition-all h-full', {
          'bg-white': link.toLocaleLowerCase() === section.current.toLocaleLowerCase()
        })
        return (
          <div key={link} className='flex items-center text-white h-8 cursor-pointer' onClick={() => onClick(link.toLocaleLowerCase())}>
            <span className={classes}></span>
            <span className='text-sm'>{link}</span>
          </div>
        )
      })}
    </div>
  )
}

export default Sidebar