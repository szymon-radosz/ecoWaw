import React, {Component} from 'react';
import {Container} from 'native-base';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {Image} from 'react-native';
import PanelBottom from './../PanelBottom/PanelBottom';
import FilterMap from './utils/FilterMap/FilterMap';
import AlertMap from './utils/AlertMap/AlertMap';
import {GlobalContext} from './../../context/GlobalContext';
import markerImage from './images/marker.png';
import truck from './images/truck.png';
import PointModal from './utils/PointModal/PointModal';

const styles = {
  container: {
    /*position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,*/
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
};

class MainMapScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPointModal: false,
      activeshowPointModalId: 0,
      activePointData: [],
    };
  }

  setShowPointModal = async () => {
    await this.setState({showPointModal: !this.state.showPointModal});
  };

  setActiveShowPointModalId = async id => {
    //console.log(['setActiveShowPointModalId', id, this.state.showPointModal]);
    const activePointDataFromContext = this.context.points.filter(
      point => point.id === id,
    );

    //console.log(['activePointDataFromContext', activePointDataFromContext]);
    this.setState({
      activeshowPointModalId: id,
      activePointData: activePointDataFromContext,
    });

    await this.setShowPointModal();
  };

  render() {
    console.disableYellowBox = true;

    return (
      <Container style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 52.22977,
            longitude: 21.01178,
            latitudeDelta: 0.1522,
            longitudeDelta: 0.08021,
          }}
          zoomEnabled={true}
          onRegionChangeComplete={async e => {
            //console.log([e.latitude, e.longitude]);
            this.context.setCoords(e.latitude, e.longitude);
            this.context.loadPointByActiveTags();
          }}>
          <Marker
            coordinate={{latitude: 52.22977, longitude: 21.01178}}
            //onPress={() => this.setActiveShowPointModalId(point.id)}
          >
            <Image source={truck} style={{width: 40, resizeMode: 'contain'}} />
          </Marker>
          {this.context &&
            this.context.points &&
            this.context.points.length > 0 &&
            this.context.points.map((point, i) => {
              return (
                <Marker
                  key={`marker-${i}`}
                  coordinate={{latitude: point.lat, longitude: point.lang}}
                  onPress={() => this.setActiveShowPointModalId(point.id)}>
                  <Image source={markerImage} />
                </Marker>
              );
            })}
        </MapView>

        {this.state.showPointModal && this.state.activePointData && (
          <PointModal
            point={this.state.activePointData}
            setShowPointModal={this.setShowPointModal}
          />
        )}

        <AlertMap />

        <FilterMap />

        <PanelBottom navigation={this.props.navigation} />
      </Container>
    );
  }
}
MainMapScreen.contextType = GlobalContext;
export default MainMapScreen;
