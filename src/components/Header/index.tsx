import React from 'react'
import styled from 'styled-components'
type Props = {

}

function HeaderComponent(props: Props) {
  const openUpdateModal = () => {

  }
  return (
    <Container>
        Othello
        <UserInfo onClick={openUpdateModal}>
          {localStorage.getItem('userName')}
        </UserInfo>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  flex: 0 0 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #dddddd;
`


const UserInfo = styled.span`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 14px;
  cursor: pointer;
`

export default HeaderComponent