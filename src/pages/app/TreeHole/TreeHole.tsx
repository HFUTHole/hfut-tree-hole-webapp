import { observer } from 'mobx-react-lite'
import { Link as RouterLink } from 'react-router-dom'
import Button from '@mui/material/Button'
import Page from '@/components/page'
import { MenuItem, TextField } from '@mui/material'
import { TreeholeList } from '@/pages/app/TreeHole/TreeholeList'
import { useQuery } from 'react-query'
import { queryKey } from '@/shared/constant/queryKey'
import { getTreeholeModesRequest } from '@/service/api/treehole'
import { treeholeListModeStore } from '@/pages/app/TreeHole/mode.store'

const TreeholeHeader = observer(() => {
  const [store] = useState(() => treeholeListModeStore)

  const { data: modes } = useQuery(queryKey.treehole.modes, getTreeholeModesRequest, {
    initialData: {
      modes: [{ value: 'hot', cn: '热门' }],
    },
  })

  return <>
    <div className={'flex j-between'}>
      <TextField
        select
        size={'small'}
        value={store.mode}
        onChange={e => store.setMode(e.target.value)}
      >
        {modes!.modes.map(item =>
          <MenuItem sx={{ mx: 1, my: 0.5, borderRadius: 1 }} value={item.value} key={item.value}>{item.cn}</MenuItem>)}
      </TextField>
      <Button
        variant="contained"
        component={RouterLink}
        to={'/app/treehole/new'}
        startIcon={<i className={'i-eva:plus-fill'} />}
      >
        发布树洞
      </Button>
    </div>
  </>
})

const Treehole = observer(() => {
  return <>
    <Page
      title={'树洞'}
      className={'grid items-center md-max-w-[45vw]'}
    >
      <div className={'grid gap5'}>
        <TreeholeHeader />
        <TreeholeList />
      </div>
    </Page>
  </>
})

export default Treehole
