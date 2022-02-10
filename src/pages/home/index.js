import React, { Component } from 'react'
import HomeStyle from './index.module.less'
import Child from './child/test'
import img from '../../assets/img/test.png'
import {reqUser} from '../../service/api'

export default class Home extends Component {
  state = {
    user: {}
  }
  componentDidMount () {
    reqUser({user: 'sheriff'}).then(res=> {
      this.setState({user: res.data})
    })
  }
  render() {
    const {name, address, profession} = this.state.user
    return (
      <div>
        <h1 className={HomeStyle.name}>Home</h1>
        <div className='fs-12'>我使用common的样式</div>
        <p className={HomeStyle.desc}>我是home，我是home，我是home，我是home，我是home</p>
        <Child/>
        <div>
          姓名： {name} <br />
          住址：{address} <br />
          职业：{profession}
        </div>
        <img src={img} alt="" />
      </div>
    )
  }
}
