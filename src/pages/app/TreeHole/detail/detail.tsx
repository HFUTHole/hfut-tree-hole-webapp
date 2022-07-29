import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { queryKey } from '@/shared/constant/queryKey'
import { getTreeholeDetailRequest } from '@/service/api/treehole'

export default function TreeholeDetail() {
  const params = useParams<{ id: string }>()
  const navigate = useNavigate()

  const id = parseInt(params.id!)

  console.log(id)

  const { data } = useQuery([queryKey.treehole.detail, id], () => getTreeholeDetailRequest(id))

  console.log(data)

  return <>
    detail
  </>
}
