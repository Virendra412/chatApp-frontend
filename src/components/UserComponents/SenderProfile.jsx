import React from 'react'
import { Avatar, Box, CloseButton } from '@chakra-ui/react'
import styled from 'styled-components'

const H1 = styled.h1`
color: red;
font-size: 4rem;
`
export const SenderProfile = ({imageUrl,handleFunction,showProfile}) => {
  return (<>
      
      
      <Box className='profileViewer' zIndex='10' opacity={showProfile?'1':'0'} pointerEvents={showProfile?'all':'none'} overflow='hidden' width='300px' aspectRatio='1/1' position='absolute' left='50%' top='50%' transform='translate(-50%,-50%)' background='linear-gradient(147deg, #4D4855 0%, #A399B2 74%)' borderRadius='5px'>
          <IM src={imageUrl?imageUrl:"https://static.vecteezy.com/system/resources/thumbnails/001/840/618/small/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"} />
          <CloseButton color='white' size='lg'  position='absolute' right='0' top='0' onClick={handleFunction}/>
      </Box>
      </>
  )
}

const IM = styled.img`
width:100%;
height:100%;
border-radius:50%;
object-fit:cover;
object-position:center center;

`
