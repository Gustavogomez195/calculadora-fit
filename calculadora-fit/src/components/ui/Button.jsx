

const Button = ({href, children}) => {
  return (
    <a href={href} className='border rounded-lg py-1 px-2 text-md hover:bg-[#252525] transition-all duration-200 '>
        {children}
    </a>
  )
}

export default Button