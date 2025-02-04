function Footer() {
  return (
    <footer className="conatiner mx-auto mt-20 bg-blackBlue text-white pt-3 pb-2 ">
      <div className="w-full  text-center leading-[1px]">
        <span className="text-base font-bold block"> Game</span>
        <span className="text-xs block">just for fun</span>
        <span className="text-xs  inline-block underline">
          <a href={process.env.NEXT_PUBLIC_AUTHOR_LINK}>
            Developed By {process.env.NEXT_PUBLIC_AUTHOR}
          </a>
        </span>
      </div>
    </footer>
  );
}
export default Footer;
