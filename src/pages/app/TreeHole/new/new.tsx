import { Paper } from '@mui/material'
import { CreateHoleForm } from '@/pages/app/TreeHole/new/form'
import Page from '@/components/page'
import { HeaderBreadcrumbs } from '@/components/breadcrubmbs/HeaderBreadcrumbs'

const TreeholeNew = () => {
  return (
    <Page title={'创建树洞'}>
      <HeaderBreadcrumbs
        heading="树洞"
        links={[
          { name: '树洞广场', href: '/app/treehole' },
          { name: '创建树洞', href: '' },
        ]}
      />
      <Paper className={'p3'}>
        <CreateHoleForm />
      </Paper>
    </Page>
  )
}

export default TreeholeNew
