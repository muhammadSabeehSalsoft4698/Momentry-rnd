import React, {useState} from 'react';

import Editor from './src/Components/Editor';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const images = [
  'https://www.shutterstock.com/image-vector/sample-red-square-grunge-stamp-260nw-338250266.jpg',
  'https://www.shutterstock.com/image-vector/sample-red-square-grunge-stamp-260nw-338250266.jpg',
  'https://www.shutterstock.com/image-vector/sample-red-square-grunge-stamp-260nw-338250266.jpg',
  'https://www.shutterstock.com/image-vector/sample-red-square-grunge-stamp-260nw-338250266.jpg',
  'https://www.shutterstock.com/image-vector/sample-red-square-grunge-stamp-260nw-338250266.jpg',
  'https://www.shutterstock.com/image-vector/sample-red-square-grunge-stamp-260nw-338250266.jpg',
];

function App(): JSX.Element {
  const [boundary, setBoundary] = useState(null);
  return (
    <GestureHandlerRootView
      style={{flex: 1}}
      onLayout={({nativeEvent}) => {
        setBoundary({
          height: nativeEvent.layout.height,
          width: nativeEvent.layout.width,
        });
      }}>
      <Editor
        images={images}
        imageHeight={100}
        imageWidth={100}
        boundary={boundary}
      />
    </GestureHandlerRootView>
  );
}

export default App;
