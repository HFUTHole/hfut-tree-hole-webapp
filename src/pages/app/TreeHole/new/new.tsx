import { CreateHoleForm } from '@/pages/app/TreeHole/new/form'
import Page from '@/components/page'
import { HeaderBreadcrumbs } from '@/components/breadcrubmbs/HeaderBreadcrumbs'
import { LoadingButton } from '@mui/lab'

const TreeholeNew = () => {
  return (
    <Page title={'创建树洞'}>
      <HeaderBreadcrumbs
        heading="树洞"
        links={[
          { name: '树洞广场', href: '/app/treehole' },
          { name: '创建树洞', href: '' },
        ]}
        action={<LoadingButton
          className={'flex1'}
          variant={'contained'}
        >
          发布
        </LoadingButton>}
      />
      <CreateHoleForm />
    </Page>
  )
}

export default TreeholeNew
