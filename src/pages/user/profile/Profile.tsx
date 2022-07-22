import { observer } from 'mobx-react-lite'
import Page from '@/components/page'
import { Card, Container, Tab, Tabs } from '@mui/material'
import { styled } from '@mui/material/styles'
import type { CustomThemeOptions } from '@/theme/overrides'
import { ProfileCover } from '@/pages/user/profile/ProfileCover'
import { ProfileTree } from '@/pages/user/profile/ProfileTree'

const TabsWrapperStyle = styled('div')(({ theme }: { theme?: CustomThemeOptions }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  backgroundColor: theme!.palette.background.paper,
  [theme!.breakpoints.up('sm')]: {
    justifyContent: 'center',
  },
  [theme!.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
    paddingRight: theme!.spacing(3),
  },
}))

const ProfileTabs = [
  {
    value: '树洞信息',
    icon: 'i-carbon:tree',
    component: <ProfileTree />,
  },
  {
    value: '个人设置',
    icon: 'i-carbon:settings',
    component: <ProfileTree />,
  },
  {
    value: '个人设置2',
    icon: 'i-carbon:settings',
    component: <ProfileTree />,
  },
  {
    value: '个人设置3',
    icon: 'i-carbon:settings',
    component: <ProfileTree />,
  },
]

const Profile = observer(() => {
  const [currentTab, setCurrentTab] = useState(ProfileTabs[0].value)

  return <>
    <Page title={'用户主页'}>
      <Container>
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: 'relative',
          }}
        >
          <ProfileCover />

          <TabsWrapperStyle>
            <Tabs
              value={currentTab}
              scrollButtons="auto"
              variant="scrollable"
              allowScrollButtonsMobile
              onChange={(e, value) => setCurrentTab(value)}
            >
              {ProfileTabs.map(tab => (
                <Tab disableRipple key={tab.value} value={tab.value} icon={<i className={`${tab.icon} text-lg`}/>} label={tab.value} />
              ))}
            </Tabs>
          </TabsWrapperStyle>
        </Card>
        {ProfileTabs.find(item => item.value === currentTab)!.component}
      </Container>
    </Page>
  </>
})

export default Profile
