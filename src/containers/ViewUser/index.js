import React, { Component } from 'react'
import {
  View,
  ActivityIndicator
} from 'react-native'
import {
  Icon
} from 'react-native-elements'
import {
  Container,
  Label,
  Text,
  CircleImage,
  ImageContainer,
  InfoContainer
} from './styled'

export default class ViewUser extends Component {
  render () {
    const user = {}
    return (
      <Container>
        <ImageContainer>
          {user.avatar
            ? <CircleImage
              source={{uri: user.avatar}}
              resizeMode='contain'
              PlaceholderContent={<ActivityIndicator />}
            />
            : <Icon name='user-circle' type='font-awesome' size={150} />
          }
        </ImageContainer>
        <InfoContainer>
          <View>
            <Label>Username:</Label>
            <Text>John_Jhonson</Text>
          </View>
          <View>
            <Label>First Name:</Label>
            <Text>John</Text>
          </View>
          <View>
            <Label>Last Name:</Label>
            <Text>Jhonson</Text>
          </View>
          <View>
            <Label>State:</Label>
            <Text>California</Text>
          </View>
          <View>
            <Label>Address:</Label>
            <Text>Fake Street, #51</Text>
          </View>
          <View>
            <Label>Email:</Label>
            <Text>john@jhonson.com</Text>
          </View>
        </InfoContainer>
      </Container>
    )
  }
}