import Image from 'next/image'
import logo from "../public/logo.png";

const Footer = () => {
  return (
    <footer className="mx-[68px] my-[80px]">
      <Image src={logo} alt='Netflix Logo' width={50} height={20} />
    </footer>
  )
}

export default Footer