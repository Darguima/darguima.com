export default function LogoBackground() {
  return (
    <div
      className="
          fixed
          bottom-[-50px] right-[-300px] w-[500] h-[500]
          md:bottom-[-200px] md:right-[-275px] md:w-[750px] md:h-[750px]
          opacity-5 z-[-10] pointer-events-none
          bg-[url('/logo.svg')] bg-no-repeat bg-right-bottom bg-contain grayscale
        "
    />
  )
}