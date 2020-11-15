import React from "react";
import { Card, Table, Spinner } from "react-bootstrap";
import TrackingsModal from "../components/TrackingsModal";
import Moment from 'react-moment';
import Server from '../Server';

export default class Device extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      device: {},
      trackings: [],
      latestTracking: {},
      latestSensor: {},
      showPastTrackingsModal: false,
      loading: true
    };
    this.deviceId = this.props.match.params.id;
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.get();
    this.getTrackings();
  }

  get = async () => {
    try {
      let response = await Server.get({ url: 'device/' + this.deviceId });
      if (response) {
        this.setState({
          device: response.device
        });
      }
    } catch (error) {
      this.setState({
      });
    }
  }

  getTrackings = async () => {
    try {
      let response = await Server.get({ url: 'tracking/' + this.deviceId });
      if (response) {
        let trackings = response.trackings;
        let latestTracking = response.trackings.length ? response.trackings[0] : {};
        let latestSensor = (latestTracking && latestTracking.sensors && latestTracking.sensors[0]) || {};
        this.setState({
          trackings,
          latestTracking,
          latestSensor,
          loading: false
        });
      }
    } catch (error) {
      this.setState({
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <Card style={{ width: "100%" }}>
          <Card border="secondary">
            <Card.Header>
              {this.deviceId}
              {this.state.device?.name && ' - ' + this.state.device?.name}
            </Card.Header>
            <Card.Body>
              {
                this.state.loading ?
                  <Spinner animation="border" variant="primary" />
                  :
                  <React.Fragment>
                    {
                      this.state.latestTracking?.productId && this.state.latestSensor.value
                        ?
                        <Table bordered hover>
                          <tbody>
                            <tr><td style={{ width: '30%' }}>Product ID</td><td>{this.state.latestTracking.productId}</td></tr>
                            <tr><td style={{ width: '30%' }}>Picked At</td><td>{this.state.latestTracking.pickedTimestamp ? new Date(this.state.latestTracking.pickedTimestamp).toDateString() : '-'}</td></tr>
                            <tr><td style={{ width: '30%' }}>Delivered At</td><td>{this.state.latestTracking.deliveredTimestamp ? new Date(this.state.latestTracking.deliveredTimestamp).toDateString() : '-'}</td></tr>
                            <tr><td style={{ width: '30%' }}>Last Latitude</td><td>{this.state.latestSensor.latitude}</td></tr>
                            <tr><td style={{ width: '30%' }}>Last Longitude</td><td>{this.state.latestSensor.longitude}</td></tr>
                            <tr><td style={{ width: '30%' }}>Sensor Type</td><td>{this.state.latestSensor.type}</td></tr>
                            <tr><td style={{ width: '30%' }}>Last Sensor Value</td><td>{this.state.latestSensor.value}</td></tr>
                            <tr><td style={{ width: '30%' }}>Last Origin Timestamp</td><td>{this.state.latestSensor.originTimestamp && <Moment date={new Date(this.state.latestSensor.originTimestamp)} />}</td></tr>
                            <tr><td style={{ width: '30%' }}>Last Data Received Timestamp</td><td>{this.state.latestSensor.timestamp && <Moment date={new Date(this.state.latestSensor.timestamp)} />}</td></tr>
                          </tbody>
                        </Table>
                        :
                        <Card.Body>
                          <div className="text-center">No tracking info yet</div>
                        </Card.Body>
                    }
                  </React.Fragment>
              }
            </Card.Body>
          </Card>
          {
            this.state.latestTracking?.sensors &&
            <Card.Body>
              <div className="text-center">
                <a href="#" onClick={() => this.setState({ showPastTrackingsModal: true })}>View full sensor data</a>
              </div>
            </Card.Body>
          }
        </Card>
        {
          this.state.showPastTrackingsModal &&
          <TrackingsModal
            show={this.state.showPastTrackingsModal}
            device={this.state.device}
            sensors={this.state.latestTracking.sensors}
            onClose={() => { this.setState({ showPastTrackingsModal: false }) }}
          />
        }
      </React.Fragment>
    );
  }
}
