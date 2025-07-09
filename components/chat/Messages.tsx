import React from 'react'

type Message = {
  role: "user" | "assistant"
  content: string
}

type MessagesProps = {
  messages: Message[]
  loading: boolean
}

export const Messages = ({messages}: MessagesProps) => {
  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>{message.content}</div>
      ))}
    </div>
  )
}
