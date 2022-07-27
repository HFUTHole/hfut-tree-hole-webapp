import { useQuery } from 'react-query'
import { getTreeholeListRequest, getTreeholeModesRequest } from '@/service/api/treehole'
import { queryKey } from '@/shared/constant/queryKey'

export function useTreehole() {
  const { data: modes } = useQuery(queryKey.treeholeModes, getTreeholeModesRequest, {
    initialData: {
      modes: [{ value: 'hot', cn: '热门' }],
    },
  })

  const [selectedMode, setSelectedMode] = useState<string>(modes?.modes[0]?.value || 'hot')

  const { data: listData } = useQuery(queryKey.treeholeList, () => getTreeholeListRequest(selectedMode), {
    initialData: [],
  })

  return {
    modes,
    listData,
    selectedMode,
    setSelectedMode,
  }
}
