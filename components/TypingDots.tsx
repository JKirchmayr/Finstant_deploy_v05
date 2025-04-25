const TypingDots = () => {
  return (
    <div className="px-4 py-2 text-sm text-gray-600 flex gap-1 items-center">
      <span>Sure, generating a list</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>

      <style jsx>{`
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
      `}</style>
    </div>
  )
}

export default TypingDots
