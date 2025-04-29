const TypingDots = () => {
  return (
    <div className="py-2 text-sm text-gray-600 flex gap-1 items-center">
      <span className="bg-clip-text text-base font-normal bg-gradient-to-r from-blue-800 via-[#dd6aba] to-blue-400 text-transparent">
        Sure, generating a list
      </span>
      <span className="animate-bounce delay-0 text-red-500 text-xl font-bold">.</span>
      <span className="animate-bounce delay-150 text-blue-500 text-xl font-bold">.</span>
      <span className="animate-bounce delay-300 text-green-500 text-xl font-bold">.</span>

      {/* <style jsx>{`
        .dot {
          animation: blink 1.4s infinite;
          font-size: 1.25rem;
          font-weight: bold;
          line-height: 1;
        }
        .dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        .dot:nth-child(3) {
          animation-delay: 0.4s;
        }
        .dot:nth-child(4) {
          animation-delay: 0.6s;
        }
        @keyframes blink {
          0%,
          80%,
          100% {
            opacity: 0;
          }
          40% {
            opacity: 1;
          }
        }
      `}</style> */}
    </div>
  )
}

export default TypingDots
