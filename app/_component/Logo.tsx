import Image from "next/image";
import logo from "@/public/images/logo2.svg";

function Logo() {
  return (
    <div className=" relative w-full h-56 bg-blackBlue ">
      <Image className="object-contain py-6" fill src={logo} alt="logo image" />
    </div>
  );
}
export default Logo;
