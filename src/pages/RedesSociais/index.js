import React from 'react'
import { View, Text} from 'react-native'
 import { WebView } from 'react-native-webview';
const index = (props) => {
  let link = props.navigation.getParam('link', '');

    return (
        <WebView
        source={{ uri: link }}
        style={{ marginTop: 20 }}
      />
    )
}

export default index
