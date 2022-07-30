import type { ReactNode } from 'react'
import type { MotionProps } from 'framer-motion'
import { motion } from 'framer-motion'
import { varFade } from '@/components/animate/variants'

interface BasicMotionProps {
  children: ReactNode
  motionProps?: MotionProps
}

export function BasicMotion({ children, motionProps = {} }: BasicMotionProps) {
  return (
    <motion.div {...varFade().in} {...motionProps}>
      {children}
    </motion.div>
  )
}
