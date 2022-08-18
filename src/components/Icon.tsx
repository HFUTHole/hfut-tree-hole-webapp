import React from 'react'

export const Icon: React.FC<{ icon: string; className?: string }> = (props) => {
  return <i className={`${props.icon} ${props.className}`} />
}
