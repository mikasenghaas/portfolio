// Footer.tsx
// By: Mika Senghaas
import { Flex, Text } from '@chakra-ui/react'

import AdminToggle from '../components/AdminToggle'

const Footer = (props: any) => {
  return (
    <Flex direction='column' justifyContent='center' alignItems='center' h='30px' marginTop='auto' pb='2rem' pt='5rem'>
      <AdminToggle state={props.state} setState={props.setState} />
      <Text mt='.2rem' fontSize='12px'>&copy; Mika Senghaas, 2022</Text>
    </Flex>
  )
}

export default Footer;
