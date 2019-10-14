import React, {useContext} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {GlobalContext} from './../../../../context/GlobalContext';
import FilterImage from './images/filter.png';

const FilterMap = () => {
  const context = useContext(GlobalContext);
  return (
    <View>
      <TouchableOpacity
        style={{
          backgroundColor: '#fff',
          position: 'absolute',
          bottom: 20,
          right: 10,
          borderRadius: 400,
          borderWidth: 2,
          borderColor: '#2f313f',
          width: 40,
          height: 40,
        }}
        onPress={() => {
          //console.log('test');
          context.setShowMapTags();
        }}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={FilterImage}
            style={{width: 20, resizeMode: 'contain'}}
          />
        </View>
      </TouchableOpacity>
      <View
        style={{
          position: 'absolute',
          bottom: 80,
          right: 10,
        }}>
        {context.showMapTags &&
          context.mapTagList &&
          context.mapTagList.length > 0 &&
          context.mapTagList.map((tag, i) => {
            if (!tag.active) {
              return (
                <TouchableOpacity
                  key={`tag-${i}`}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 200,
                    marginTop: 10,
                    paddingTop: 5,
                    paddingBottom: 5,
                    paddingLeft: 20,
                    paddingRight: 20,
                    borderWidth: 2,
                    borderColor: '#2f313f',
                  }}
                  onPress={() => {
                    context.setTagStatus(tag.id);
                    context.loadPointByActiveTags();
                  }}>
                  <Text style={{textAlign: 'center'}}>{tag.name}</Text>
                </TouchableOpacity>
              );
            } else {
              return (
                <TouchableOpacity
                  key={`tag-${i}`}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 200,
                    marginTop: 10,
                    paddingTop: 5,
                    paddingBottom: 5,
                    paddingLeft: 20,
                    paddingRight: 20,
                    borderWidth: 2,
                    borderColor: '#5dcb74',
                  }}
                  onPress={() => {
                    context.setTagStatus(tag.id);
                    context.loadPointByActiveTags();
                  }}>
                  <Text style={{textAlign: 'center', color: '#5dcb74'}}>
                    {tag.name}
                  </Text>
                </TouchableOpacity>
              );
            }
          })}
      </View>
    </View>
  );
};

export default FilterMap;
