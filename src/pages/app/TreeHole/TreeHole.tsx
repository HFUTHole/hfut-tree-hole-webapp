import { observer } from 'mobx-react-lite'
import { Link as RouterLink } from 'react-router-dom'
import Button from '@mui/material/Button'
import Page from '@/components/page'
import { MenuItem, TextField } from '@mui/material'
import { useTreehole } from '@/pages/app/TreeHole/utils'
import { TreeholeList } from '@/pages/app/TreeHole/TreeholeList'

const TreeholeHeader = () => {
  const { modes, selectedMode, setSelectedMode } = useTreehole()

  return <>
    <div className={'j-between'}>
      <TextField
        select
        size={'small'}
        value={selectedMode}
        onChange={e => setSelectedMode(e.target.value)}
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
}

const Treehole = observer(() => {
  return <>
    <Page title={'树洞'} className={'grid gap5'}>
      <TreeholeHeader/>
      <TreeholeList />
    </Page>
  </>
})

export default Treehole
