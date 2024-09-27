import { Image } from 'semantic-ui-react'
import LogoImg from '../../assets/main_logo.jpg'

const Logo = () => {
  return (
    <Image src={LogoImg} size='tiny' wrapped circular bordered />
    // <a href='/'  className='flex items-center text-dark'>
    //     <div className='w-16 rounded-full overflow-hidden border-2 border-solid border-dark'>
    //         <img src={LogoImg} alt='logo' className='w-full h-auto rounded-full' />
    //     </div>
    // </a>
  )
}

export default Logo
