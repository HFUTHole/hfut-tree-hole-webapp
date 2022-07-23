import { observer } from 'mobx-react-lite'
import { Link as RouterLink } from 'react-router-dom'
import Button from '@mui/material/Button'
import Page from '@/components/page'
import { MenuItem, TextField } from '@mui/material'
import { useQuery } from 'react-query'
import { getTreeholeModesRequest } from '@/service/api/treehole'

const TreeHoleHeader = () => {
  const { data } = useQuery('treeholeModess', getTreeholeModesRequest, {
    placeholderData: {
      modes: [{ value: 'hot', cn: '热门' }],
    },
  })

  const [selectedMode, setSelectedMode] = useState<string>(data!.modes[0].value)

  return <>
    <div className={'j-between'}>
      <TextField
        select
        size={'small'}
        value={selectedMode}
        onChange={e => setSelectedMode(e.target.value)}
      >
        {data!.modes.map(item =>
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

const TreeHole = observer(() => {
  return <>
    <Page title={'树洞'}>
      <TreeHoleHeader/>
    </Page>
  </>
})

export default TreeHole
