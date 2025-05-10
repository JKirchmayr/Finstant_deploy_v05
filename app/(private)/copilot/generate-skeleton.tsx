export const GenerateSkeleton = ({
  isPlaceholder,
  text,
}: {
  isPlaceholder?: boolean
  text?: string
}) => {
  return (
    <div className="w-full">
      {isPlaceholder ? (
        <span className="inline-block truncate w-3/4 h-4 bg-gradient-to-r from-black via-gray-900 to-gray-800 animate-pulse bg-clip-text text-transparent">
          {text}
        </span>
      ) : (
        <span className="truncate">{text}</span>
      )}
    </div>
  )
}
