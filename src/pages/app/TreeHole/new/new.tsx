import { Paper } from '@mui/material'
import { CreateHoleForm } from '@/pages/app/TreeHole/new/form'
import Page from '@/components/page'

const TreeholeNew = () => {
  return (
    <Page title={'创建树洞'}>
      <Paper className={'p3'}>
        <CreateHoleForm />
      </Paper>
    </Page>
  )
}

export default TreeholeNew
