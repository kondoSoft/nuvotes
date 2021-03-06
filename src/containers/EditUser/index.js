import React, { Component } from 'react'
import { Keyboard } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ImagePicker from 'react-native-image-picker'
import {
  Icon,
  Input,
  Button
} from 'react-native-elements'
import {
  Label,
  ImageContainer,
  CircleImage,
  InfoContainer,
  FlexRow,
  InputContainer,
  styles
} from './styled'
import { translate } from '../../helpers/localization'

export default class EditUser extends Component {
  constructor (props) {
    super(props)
    this.state = {
      image: ''
    }
    this.showImagePicker = this.showImagePicker.bind(this)
  }
  render () {
    return (
      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={styles.keyboardScrollViewContentStyle}
        keyboardShouldPersistTaps='always'
        keyboardDismissMode='on-drag'
      >
        <ImageContainer onPress={this.showImagePicker}>
          {this.renderAvatar()}
          <Icon
            type='font-awesome'
            name='edit'
            containerStyle={styles.editIconStyle}
          />
        </ImageContainer>
        <InfoContainer>
          <FlexRow>
            <InputContainer width={40}>
              <Label>{translate.firstName}:</Label>
              <Input
                containerStyle={styles.containerStyle}
                autoCorrect={false}
                autoCapitalize='none'
                inputStyle={styles.inputStyle}
                blurOnSubmit={false}
                onSubmitEditing={() => this.lastName.input.focus()}
              />
            </InputContainer>
            <InputContainer width={40}>
              <Label >{translate.lastName}:</Label>
              <Input
                containerStyle={styles.containerStyle}
                autoCorrect={false}
                autoCapitalize='none'
                inputStyle={styles.inputStyle}
                blurOnSubmit={false}
                ref={refs => {
                  this.lastName = refs
                }}
                onSubmitEditing={() => this.stateInput.input.focus()}
              />
            </InputContainer>
          </FlexRow>
          <InputContainer>
            <Label>{translate.state}:</Label>
            <Input
              containerStyle={styles.containerStyle}
              autoCorrect={false}
              autoCapitalize='none'
              inputStyle={styles.inputStyle}
              blurOnSubmit={false}
              ref={refs => {
                this.stateInput = refs
              }}
              onSubmitEditing={() => this.address.input.focus()}
            />
          </InputContainer>
          <InputContainer>
            <Label>{translate.address}:</Label>
            <Input
              containerStyle={styles.containerStyle}
              autoCorrect={false}
              autoCapitalize='none'
              inputStyle={styles.inputStyle}
              blurOnSubmit={false}
              ref={refs => {
                this.address = refs
              }}
              onSubmitEditing={() => this.email.input.focus()}
            />
          </InputContainer>
          <InputContainer>
            <Label>{translate.email}:</Label>
            <Input
              containerStyle={styles.containerStyle}
              autoCorrect={false}
              autoCapitalize='none'
              inputStyle={styles.inputStyle}
              blurOnSubmit={false}
              ref={refs => {
                this.email = refs
              }}
              onSubmitEditing={() => this.password.input.focus()}
            />
          </InputContainer>
          <InputContainer>
            <Label>{translate.password}:</Label>
            <Input
              containerStyle={styles.containerStyle}
              secureTextEntry
              inputStyle={styles.inputStyle}
              onSubmitEditing={Keyboard.dismiss}
              ref={refs => {
                this.password = refs
              }}
            />
          </InputContainer>
          <Button
            title={translate.save}
            icon={{
              type: 'font-awesome',
              name: 'save'
            }}
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.titleStyle}
            containerStyle={styles.buttonContainerStyle}
          />
        </InfoContainer>
      </KeyboardAwareScrollView>
    )
  }

  renderAvatar () {
    const { image } = this.state
    const { user } = this.props
    if (image !== '') {
      return <CircleImage source={{uri: image}} />
    }
    if (user && user.avatar) {
      return <CircleImage
        resizeMode='contain'
        source={{uri: user.avatar}}
      />
    }
    return <Icon
      name='user-circle'
      type='font-awesome'
      size={120}
      containerStyle={styles.iconContainerStyle}
    />
  }

  showImagePicker () {
    const options = {
      title: translate.selectAvatar,
      takePhotoButtonTitle: `${translate.takePhoto}...`,
      chooseFromLibraryButtonTitle: `${translate.chooseGallery}...`,
      cancelButtonTitle: translate.cancel
    }
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('USER cancalled')
      } else if (response.error) {
        console.log('An error has ocurred')
      } else {
        const { uri } = response
        this.setState({image: uri})
      }
    })
  }
}
