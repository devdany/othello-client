import { GET_LOCAL_USER, SET_LOCAL_USER } from '../../apollo/clientQuries'
import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'

import Header from '../Header'
import Start from '../Start'
// import client from '../../apollo/client'
import styled from 'styled-components'

type Props = {
  history: any
}

function HomeComponent(props: Props) {
  // const { loading, error, data, networkStatus} = useQuery(GET_USER, {
  //   variables: {
  //     userId: 'abc',
  //   },
  //   notifyOnNetworkStatusChange: true,
  // })
  const [username, setUsername] = useState('')
  const { data } = useQuery(GET_LOCAL_USER)
  const [ setLocalUser ] = useMutation(SET_LOCAL_USER)
  const saveUserName = (e: any) => {
    if (e.key === 'Enter') {
      setLocalUser({
        variables: {
          userName: username
        }
      })
    }
  }

  return (
    <Container>
      <ContentBox>
        <Header />
        <Body>
          {data.userName ? (<Start history={props.history} />) : (<NameInputBox onKeyPress={saveUserName}><NameInput onChange={(e) => { setUsername(e.target.value) }}  placeholder={'Input user name ..'} value={username}/></NameInputBox>)}
        </Body>
      </ContentBox>
    </Container>
  )
}

export default HomeComponent

const Container = styled.div`
  width: 100%;
  height: 100vh;
`

const ContentBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const Body = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

const NameInputBox = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const NameInput = styled.input`
  width: 300px;
  flex: 0 0 50px;
  border: 1px solid #888888;
  border-radius: 4px;
`