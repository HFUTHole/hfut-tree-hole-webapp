import { Fab } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { CommentForm } from '@/pages/app/TreeHole/detail/CommentForm'
import { varFade, varSlide } from '@/components/animate/variants'
import { BasicMotion } from '@/components/animate/basic-motion'

export const CommentFab = () => {
  const [openComment, setOpenComment] = useState(false)

  return (
    <div className={'px5 fixed z-[999] bottom-15 left-0 right-0'}>
      <AnimatePresence>
        {!openComment && (
          <BasicMotion>
            <Fab
              color={'primary'}
              className={'!fixed right-4 bottom-15'}
              onClick={() => setOpenComment(prev => !prev)}
            >
              <i className={'i-ic:outline-quickreply text-2xl'} />
            </Fab>
          </BasicMotion>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {
          openComment && (
            <motion.div {...varSlide().inUp} {...varFade().inUp}>
              <CommentForm setFormOpen={setOpenComment}/>
            </motion.div>
          )
        }
      </AnimatePresence>
    </div>
  )
}
