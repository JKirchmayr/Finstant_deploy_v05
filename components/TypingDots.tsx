const TypingDots = () => {
  return (
    <div className="py-2 text-sm text-gray-600 flex gap-1 items-center">
      {/* <span className=" font-normal italic text-muted-foreground">Sure, generating a list</span> */}
      <span className="w-2 h-2 bg-transparant animate-ping  rounded-full border-[4px] border-gray-800"></span>
      {/* <span className="animate-bounce delay-0 text-gray-500 text-xl font-bold">.</span>
      <span className="animate-bounce delay-150 text-gray-500 text-xl font-bold">.</span>
      <span className="animate-bounce delay-300 text-gray-500 text-xl font-bold">.</span> */}
    </div>
  )
}

export default TypingDots
