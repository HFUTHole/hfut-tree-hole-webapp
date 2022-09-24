import React from 'react'

export const Icon: React.FC<{ icon: string; className?: string }> = (props) => {
  const icon = props.icon.startsWith('i-') ? props.icon : `i-${props.icon}`

  return <i className={`${icon} ${props.className}`} />
}
