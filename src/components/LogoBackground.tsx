export default function LogoBackground() {
  return (
    <div
      className="
          fixed
          bottom-[-50px] right-[-350px] w-[500] h-[500]
          md:bottom-[-250px] md:right-[-250px] md:w-[750px] md:h-[750px]
          opacity-5 z-[-10] pointer-events-none
          bg-[url('/logo.svg')] bg-no-repeat bg-right-bottom bg-contain grayscale
        "
    />
  )
}