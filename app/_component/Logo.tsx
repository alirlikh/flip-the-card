import Image from "next/image";
import logo from "@/public/images/logo.png";

function Logo() {
  return (
    <div className=" relative w-full h-56">
      <Image className="object-cover" fill src={logo} alt="logo image" />
    </div>
  );
}
export default Logo;
