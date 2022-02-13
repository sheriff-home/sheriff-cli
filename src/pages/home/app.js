import React from 'react'
import HomeStyle from './index.module.less'
import { reqUser } from '../../service/api'

function App() {
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    reqUser({ user: 'sheriff' })
      .then(res => {
        setUser(res.data)
      })
  }, [])

  return (
    <div className={HomeStyle.name}>
      Home...
      <br />
      <div>
        姓名： {user.name} <br />
        住址：{user.address} <br />
        职业：{user.profession}
      </div>
    </div>
  )
}

export default App
