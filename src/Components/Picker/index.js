import {
  FlatList,
  Image,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

import {icons} from '../../Assets/Images';
import styles from './styles';

const Picker = props => {
  const buttonProps = props.buttonProps;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const handleModalVisibility = () => setModalVisible(!modalVisible);
  const onSelect = item => {
    props.onItemSelect(item);
    setSelectedItem(item);
    handleModalVisibility();
  };

  const renderItem = ({item, index}) => (
    <>
      <TouchableOpacity
        key={item}
        style={styles.selectedContainer}
        onPress={() => onSelect(item)}>
        <Text style={[selectedItem == item && {color: '#000000'}]}>{item}</Text>
        {selectedItem == item && (
          <Image source={icons.tick} style={styles.tick} />
        )}
      </TouchableOpacity>
      {props.items?.length - 1 > index && <View style={styles.divider} />}
    </>
  );

  return (
    <>
      <TouchableOpacity
        key={buttonProps.key}
        disabled={buttonProps.disabled}
        style={buttonProps.style}
        onPress={handleModalVisibility}>
        <Image source={buttonProps.icon} style={buttonProps.iconStyle} />
      </TouchableOpacity>
      <Modal transparent={true} visible={modalVisible} style={{flex: 1}}>
        <Pressable onPress={handleModalVisibility}>
          <View style={styles.blurViewStyle} />
        </Pressable>
        <View style={styles.alertMainView}>
          <View style={styles.row}>
            <Text style={styles.label}>{props.label}</Text>
            {selectedItem && (
              <TouchableOpacity
                style={styles.crossIconContainer}
                onPress={handleModalVisibility}>
                {/* <Image source={icons.cross} style={styles.crossIcon} /> */}
                <Text style={styles.doneText}>Done</Text>
              </TouchableOpacity>
            )}
          </View>
          <FlatList data={props.items} renderItem={renderItem} />
        </View>
      </Modal>
    </>
  );
};

export default Picker;
