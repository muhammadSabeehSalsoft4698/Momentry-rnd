import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {RichEditor, RichToolbar, actions} from 'react-native-pell-rich-editor';

import FontFamilyStylesheet from '../../Assets/Fonts/stylesheet';
import RNHTMLtoPDF from 'react-native-html-to-pdf-lite';
import Slider from '../Slider';
import {icons} from '../../Assets/Images';
import styles from './styles';

const Editor = ({images, imageHeight, imageWidth, boundary}) => {
  const editorRef = useRef();
  const fontRef = useRef();
  const [editorViewLayout, setEditorViewLayout] = useState();
  const handleFontChange = font => {
    fontRef.current = font;
    editorRef.current?.blurContentEditor();
  };

  const onDragRelease = (item, {x, y, height, width}) => {
    if (
      y < editorViewLayout.y + editorViewLayout.height &&
      x < editorViewLayout.x + editorViewLayout.width
    ) {
      editorRef.current?.insertImage(
        item,
        `width: ${width}px; height: ${height}px`,
      );
    }
  };

  const onSavePdf = async () => {
    try {
      const html = await editorRef.current?.getContentHtml();
      let options = {
        html,
        fileName: 'rnd-testpdf',
        directory: 'Documents',
      };
      Platform.OS == 'android'
        ? await RNHTMLtoPDF.savePdf(options)
        : await RNHTMLtoPDF.convert(options);
    } catch (error) {
      console.log(error);
    }
  };

  // const renderItem = (item, index) => {
  //   return (
  //     <Drag
  //       key={index}
  //       style={styles.dragContainer}
  //       height={imageHeight}
  //       width={imageWidth}
  //       // limitationHeight={limitationHeight}
  //       // limitationWidth={limitationWidth}
  //       // x={index * imageWidth}
  //       // y={editorViewLayout?.height + vh * 6}
  //       shouldReverse
  //       onDragEnd={boxPosition => onDragRelease(item, boxPosition)}>
  //       <Image source={{uri: item}} style={styles.imageStyle} />
  //     </Drag>
  //   );
  // };

  return (
    <View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView>
          <RichEditor
            scrollEnabled={true}
            useContainer={false}
            ref={editorRef}
            onFocus={() => {
              fontRef.current &&
                editorRef.current?.setFontName(fontRef.current);
            }}
            style={styles.editorStyle}
            // editorInitializedCallback={editorLoadFinished}
            editorStyle={{cssText: FontFamilyStylesheet}}
            onLayout={({nativeEvent}) =>
              setEditorViewLayout(nativeEvent.layout)
            }
            onHeightChange={height => (editorViewLayout.height = height)}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      <RichToolbar
        editor={editorRef}
        actions={[
          actions.setBold,
          actions.setItalic,
          actions.insertBulletsList,
          actions.insertOrderedList,
          'fontChangeAction',
          'savePdf',
        ]}
        iconMap={{fontChangeAction: icons.font, savePdf: icons.saveDoc}}
        fontChangeAction={handleFontChange}
        savePdf={onSavePdf}
      />
      {boundary && images && (
        <Slider
          items={images}
          imageHeight={imageHeight}
          imageWidth={imageWidth}
          onDragEnd={onDragRelease}
          boundary={boundary}
        />
      )}

      {/* {images && editorViewLayout?.height && (
        <>
          <ScrollView
            style={{
              // height: imageHeight + vh * 1.25,
              borderBottomWidth: vh * 1.25,
              borderBottomColor: '#000000' + '22',
            }}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              width: images.length * imageWidth,
            }}
            horizontal>
            {images.map(renderItem)}
          </ScrollView>
        </>
      )} */}
    </View>
  );
};

export default Editor;
