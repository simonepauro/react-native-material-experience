'use strict'
import React, { Component } from 'react';
import {
  View,
  Animated,
  Platform,
  Dimensions,
  Image,
  Text,
  StatusBar
} from 'react-native';
import { ActionIcon } from './ActionIcon';
//import Utils from './';

const display = Dimensions.get('window');

const isIphoneX = (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (display.height === 812 || display.width === 812)
);

export const statusbarHeight = Platform.OS == 'ios' ?  (isIphoneX ? 44 : 20) : (Platform.Version >= 21 ? 24 : 0); // 20 iOS : 24 android
export const appbarHeight = ( Platform.OS == 'ios' ?  44 : 56 );

/*
style
backgroindImageStyle
headerTitleStyle

backgroundColor
color
navigationIcon - arrow_back | menu | close
statusBar
backgroundImage
backgroundImageMode - cover | logo
onNavigationPress

actions [
  title
  icon
  onPress
]
*/
export class AppBar extends Component {
  render() {

    let propStyle = this.props.style ?  this.props.style : {};
    let bgPropStyle = this.props.backgroundImageStyle ? this.props.backgroundImageStyle : {};

    let bgColor =  propStyle.backgroundColor ? propStyle.backgroundColor : '#2196f7';
    let color = 'rgba(0, 0, 0, .9)';
    if(propStyle.color) {
      color = propStyle.color;
      delete propStyle.color;
    }

    var navigationIcon = this.props.navigationIcon;
    switch(this.props.navigationIcon) {
      case 'arrow_back':
        navigationIcon = require('../../img/ic_arrow_back_white.png');
        break;
      case 'menu':
        navigationIcon = require('../../img/ic_menu_white.png');
        break;
      case 'close':
        navigationIcon = require('../../img/ic_close_white.png');
        break;
    }
    //navigationIcon = require('../../img/ic_arrow_back_white.png');

    var height = propStyle.height ? propStyle.height : appbarHeight;
    if(height<appbarHeight) height = appbarHeight;

    var actionsWidth = this.props.actions ? (this.props.actions.length * 48) : 0

    var titlePaddingLeft = 16 + (navigationIcon ? 56 : 0);
    var titleWidth = display.width - titlePaddingLeft - actionsWidth - 12 ;

    var textAlign = Platform.OS === 'ios' ? 'center' : 'left';
    if(this.props.actions && this.props.actions.length>1) textAlign = 'left';

    // bugfix iOS textAlign center with 0 or 1 action
    if (Platform.OS === 'ios' && navigationIcon && !(this.props.actions && this.props.actions.length>1)) {
      if (!this.props.actions || this.props.actions.length < 1) titleWidth -= 48;
      titleWidth -= 8;
    }

    // background image
    let bgImgResizeMode = this.props.backgroundImageMode === 'logo' ? 'contain' : 'cover';
    let bgImgTop = bgImgResizeMode === 'cover' ? 0 : (this.props.statusBar ? statusbarHeight : 0); 
    let bgImgHeight = bgPropStyle.height ? bgPropStyle.height : (height + (bgImgResizeMode === 'cover' ? statusbarHeight : 0));

    return (
      <Animated.View style={{
        width: display.width,
        height: (this.props.statusBar ? statusbarHeight : 0) + height,
        backgroundColor: 'bgColor',
        elevation: 4,
        paddingTop: this.props.statusBar ? statusbarHeight : 0,
        flexDirection: 'row',
        ...propStyle,
      }}>

        {this.props.backgroundImage ? <Animated.Image
          source={this.props.backgroundImage}
          resizeMode={bgImgResizeMode}
          style={{
            position: 'absolute',
            top: bgImgTop,
            left: 0,
            width: display.width,
            ...bgPropStyle,
            height: bgImgHeight,
          }}
        /> : null}

        <Animated.View style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: display.width,
          height: appbarHeight,
          alignItems: 'center',
          flexDirection: 'row',
          paddingLeft: titlePaddingLeft,
          ...this.props.headerStyle
        }}>

          <Animated.Text
            style={{
              fontSize: Platform.OS === 'ios' ? 17 : 20,
              fontWeight: Platform.OS === 'ios' ? '600' : '500',
              color: color,
              textAlign: textAlign,
              ...this.props.headerTitleStyle,
              width: titleWidth,
            }}
            ellipsizeMode='tail'
            numberOfLines={2}
          >{this.props.title}</Animated.Text>

        </Animated.View>

        {navigationIcon ? <ActionIcon
          iconStyle={{tintColor: color}}
          onPress={this.props.onNavigationPress}
          source={navigationIcon}
          style={{
            position: 'absolute',
            left: 0,
            top: this.props.statusBar ? statusbarHeight : 0,
          }}
        /> : null}

        <View style={{
          position: 'absolute',
          right: 4,
          top: this.props.statusBar ? statusbarHeight : 0,
          flexDirection: 'row',
        }}>
          {this.props.actions ? this.props.actions.map((action, index) => {
            return (
              <ActionIcon
                key={index}
                title={action.title}
                source={action.icon}
                isHeaderRight={true}
                onPress={action.onPress}
                iconStyle={{
                  tintColor: color,
                  marginHorizontal: 12,
                }}
                iconLabelStyle={{
                  color: color,
                  marginHorizontal: 12,
                }}
              />
            )
          }) : null}
        </View>

      </Animated.View>
    );

    /*
    {navigationIcon ? <ActionIcon
      iconStyle={{tintColor: color}}
      onPress={this.props.onNavigationPress}
      source={navigationIcon}
    /> : null}
    <Animated.Text style={{
      fontSize: Platform.OS === 'ios' ? 17 : 20,
      fontWeight: Platform.OS === 'ios' ? '600' : '500',
      color: color,
      textAlign: Platform.OS === 'ios' ? 'center' : 'left',
      marginHorizontal: 16,
    }}>Detail</Animated.Text>

    <Animated.Text style={{
      fontSize: Platform.OS === 'ios' ? 17 : 20,
      fontWeight: Platform.OS === 'ios' ? '600' : '500',
      color: color,
      textAlign: Platform.OS === 'ios' ? 'center' : 'left',
      position: 'absolute',
      bottom: 14.5,
      left: 16 + (navigationIcon ? 56 : 0)
    }}>Detail</Animated.Text>
    */

    //last
    /*
    <Animated.Text style={{
      fontSize: Platform.OS === 'ios' ? 17 : 20,
      fontWeight: Platform.OS === 'ios' ? '600' : '500',
      color: color,
      textAlign: Platform.OS === 'ios' ? 'center' : 'left',
      position: 'absolute',
      bottom: 14.5,
      left: titleLeft,
      backgroundColor: 'red',
      width: titleWidth,
      ...this.props.titleStyle,
    }}>
      Museo soldati della battaglia
    </Animated.Text>
    */


  }
}






















/* eof */
