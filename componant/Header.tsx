import { View, Text } from 'react-native'
import React from 'react'

interface HeaderProps {
    name: string;
}
const Header = ({name}:HeaderProps) => {
  return (
    <View>
      <Text>Welcome to {name}</Text>
    </View>
  )
}

export default Header

// interface HeaderProps {
//     name: string;
// }

// export default function Header(name:{appName}){
//     return (
//     <View>
//         <Text>Welcom to {appName}<Text/>
//     <View/>
//     )
// }
