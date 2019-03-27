import React from 'react'
import {
  Flex,
  WhiteSpace
} from 'antd-mobile'

export const Result = () => {

  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'fixed',
      background: '#e8e8e8',
      left: 0,
      top: 0,
      zIndex: 3
    }}>
      <WhiteSpace size="lg" />
      <Flex justify="center" direction="column">
        <img src={require('../assets/qun.jpg')} alt="" width="80%" />
        <p style={{color: "#6b6767", fontSize: "6vw"}}>报名成功！请加入比赛群。</p>
      </Flex>
    </div>
  )
}