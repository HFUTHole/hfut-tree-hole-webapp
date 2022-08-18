import React from 'react'

export const Icon: React.FC<{ icon: string }> = (props) => {
  return <i className={props.icon} />
}
