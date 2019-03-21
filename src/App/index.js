import React, { useState } from 'react'
import { enroll } from '../api'
import { removeEle } from '../utils'
import {
  NavBar,
  List,
  WingBlank,
  InputItem,
  WhiteSpace,
  Button,
  Toast,
  Modal
} from 'antd-mobile'

export const App = () => {
  const [playerList, setPlayerList] = useState([])
  const [basicInfo, setBasicInfo] = useState({})
  const [errList, setErrList] = useState(['default'])
  const [loading, setLoading] = useState(false)

  const addPlayer = () => {
    if (playerList.length >= 4) return Toast.fail('最多可添加4名队员', 1.5)
    setPlayerList(playerList.concat(''))
  }
  const deletePlayer = () => {
    if (playerList.length <= 0) return Toast.fail('没有要删除的队员了', 1.5)
    setPlayerList(playerList.slice(0, playerList.length - 1))
    let playerLastIndex = playerList.length - 1
    setErrList(removeEle(errList, `stu${playerLastIndex}`))
  }
  const inputVerifi = key => ({
    error: errList.includes(key),
    onBlur: val => {
      if (val === '') setErrList(errList.concat(key))
      setBasicInfo({ ...basicInfo, [key]: val })
    },
    onChange: val => {
      if (val !== '') setErrList(removeEle(errList, key))
    }
  })

  return (
    <>
      <NavBar>比赛报名系统</NavBar>
      <WingBlank>
        <List
          renderHeader={() => '请填写您的报名信息'}
        >
          <InputItem
            maxLength={8}
            error={errList.includes('team')}
            {...inputVerifi('team')}
          >队伍名称</InputItem>
          <InputItem
            maxLength={12}
            {...inputVerifi('captain')}
          >队长姓名</InputItem>
          <InputItem
            type="number"
            maxLength={10}
            {...inputVerifi('stuid')}
          >队长学号</InputItem>
          <InputItem
            type="number"
            {...inputVerifi('phone')}
          >联系电话</InputItem>
          <InputItem
            maxLength={14}
            {...inputVerifi('college')}
          >学院</InputItem>
          <InputItem
            maxLength={12}
            {...inputVerifi('teacher')}
            onFocus={() => setErrList(removeEle(errList, 'default'))}
          >指导老师</InputItem>
        </List>
        <List
          renderHeader={() => '请添加1-4名队员的学号'}
        >
          <WingBlank>
            <WhiteSpace />
            <Button type="ghost" inline size="small" style={{ width: "48%" }} onClick={deletePlayer}>删除</Button>
            <Button type="primary" inline size="small" style={{ width: "48%", float: "right" }} onClick={addPlayer}>添加</Button>
          </WingBlank>
          <WhiteSpace />
          {
            playerList.map((e, i) =>
              <InputItem
                key={i}
                type="number"
                maxLength={10}
                error={errList.includes(`stu${i}`)}
                onBlur={val => {
                  if (val === '') setErrList(errList.concat(`stu${i}`))
                  let list = [...playerList]
                  list[i] = +val
                  setPlayerList(list)
                }}
                onChange={val => {
                  if (val !== '') setErrList(removeEle(errList, `stu${i}`))
                }}
              >
                学号{i + 1}
              </InputItem>
            )
          }
        </List>
        <WhiteSpace size="xl"></WhiteSpace>
        <WingBlank size="lg">
          <Button
            type="primary"
            loading={loading}
            onClick={() => {
              if (
                errList.length !== 0
                || playerList.includes('')
                || Object.keys(basicInfo).length !== 6
              ) { return Toast.fail('未填完报名信息') }
              setLoading(true)
              let list = JSON.stringify(playerList)
              let data = {...basicInfo, stuids: list}
              enroll(data)
              .then(res => {
                setLoading(false)
                let status = res.data.status
                switch (status) {
                  case 403:
                    Modal.alert('输入的队伍名称或学号或联系方式长度不对')
                    break
                  case 202:
                    Modal.alert('您已经报过名了')
                    break
                  case 400:
                    Modal.alert('报名失败！')
                    break
                  case 200:
                    Modal.alert('报名成功！')
                    break
                  default:
                    Modal.alert('报名失败！')
                }
              })
              .catch(err => {
                setLoading(false)
                Modal.alert('报名失败！')
              })
            }}
          >提交</Button>
        </WingBlank>
        <WhiteSpace size="lg" />
      </WingBlank>
    </>
  )
}