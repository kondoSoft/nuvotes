import React, { Component } from 'react'
import {
  ScrollView,
  ActivityIndicator,
  Platform,
  Alert
} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import {
  Text,
  Icon,
  Button
} from 'react-native-elements'
import {
  Container,
  FlexRow,
  ButtonsContainer,
  ImagesContainer,
  Thumbnail,
  ImageBox,
  styles
} from './styled'
import { translate } from '../../helpers/localization'

export default class UploadPhotos extends Component {
  constructor (props) {
    super(props)
    this.state = {
      photos: [],
      isVisible: props.isVisible
    }
    this.handleClose = this.handleClose.bind(this)
    this.selectFromCamera = this.selectFromCamera.bind(this)
    this.selectFromGallery = this.selectFromGallery.bind(this)
  }
  render () {
    const { photos } = this.state
    return (
      <Container>
        <Text h4>{translate.photos}</Text>
        {photos.length > 0 &&
          <ScrollView
            bounces={false}
            contentContainerStyle={styles.scrollViewContainer}
          >
            <ImagesContainer>
              {this.renderImages()}
            </ImagesContainer>
          </ScrollView>
        }
        <ButtonsContainer>
          <Button
            buttonStyle={{...styles.buttonStyle, ...styles.marginButton}}
            titleStyle={styles.buttonTitle}
            type='outline'
            title={`${translate.takePhoto}...`}
            onPress={this.selectFromCamera}
          />
          <Button
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.buttonTitle}
            type='outline'
            title={`${translate.chooseGallery}...`}
            onPress={this.selectFromGallery}
          />
        </ButtonsContainer>
        <FlexRow>
          <Button
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.buttonTitle}
            type='outline'
            title={translate.cancel}
            onPress={this.handleClose}
          />
          <Button
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.buttonTitle}
            type='outline'
            title={translate.save}
          />
        </FlexRow>
      </Container>
    )
  }

  handleClose () {
    const { changeVisibility } = this.props
    const { isVisible } = this.state
    changeVisibility(!isVisible)
  }

  renderImages () {
    const { photos } = this.state
    const isAndroid = Platform.OS === 'android'
    return photos.map((photo, index) => {
      const { sourceURL, path } = photo
      return (
        <ImageBox key={index}>
          <Thumbnail
            source={{uri: isAndroid ? path : sourceURL}}
            PlaceholderContent={<ActivityIndicator />}
          />
          <Icon
            type='font-awesome'
            name='times'
            containerStyle={styles.deleteIcon}
            onPress={() => this.deletePhoto(index)}
            underlayColor='transparent'
          />
        </ImageBox>
      )
    })
  }

  savePhoto (images, type) {
    const { photos } = this.state
    images = images.map(image => {
      image.type = type
      return image
    })
    const newPhotosArray = [...photos, ...images]
    this.setState({photos: newPhotosArray})
  }

  selectFromGallery () {
    ImagePicker.openPicker({
      multiple: true
    }).then(images => {
      const { descriptionJob } = this.props
      if (descriptionJob !== 'inspection') {
        Alert.alert(
          translate.savePhotoAlertTitle,
          translate.savePhotoAlertMessage,
          [
            {text: translate.before, onPress: () => this.savePhoto(images, 'before')},
            {text: translate.inProgress, onPress: () => this.savePhoto(images, 'in_progress')},
            {text: translate.after, onPress: () => this.savePhoto(images, 'after')}
          ], {cancelable: false}
        )
      } else {
        this.savePhoto(images, 'property')
      }
    })
  }

  selectFromCamera () {
    ImagePicker.openCamera({
    }).then(image => {
      const { descriptionJob } = this.props
      if (descriptionJob !== 'inspection') {
        Alert.alert(
          translate.savePhotoAlertTitle,
          translate.savePhotoAlertMessage,
          [
            {text: translate.before, onPress: () => this.savePhoto(image, 'before')},
            {text: translate.inProgress, onPress: () => this.savePhoto(image, 'in_progress')},
            {text: translate.after, onPress: () => this.savePhoto(image, 'after')}
          ], {cancelable: false}
        )
      } else {
        this.savePhoto(image, 'property')
      }
    })
  }

  deletePhoto (index) {
    let { photos } = this.state
    photos.splice(index, 1)
    this.setState({photos})
  }
}
