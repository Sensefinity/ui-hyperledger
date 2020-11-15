import React from "react";
import {
  Card,
  Form
} from "react-bootstrap";
import DeviceModal from "../components/DeviceModal";
import RemoveDeviceModal from "../components/RemoveDeviceModal";
import AddDeviceModal from "../components/AddDeviceModal";
import DataTable from 'react-data-table-component';
import Server from '../Server';

export default class Freights extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeviceModal: false,
      showRemoveDeviceModal: false,
      showAddDeviceModal: false,
      deviceId: null,
      deviceName: null,
      devices: [],
      devicesFiltered: [],
      searchText: ""
    };
    this.columns = [
      {
        name: 'ID',
        selector: 'id',
        sortable: true,
        maxWidth: '150px',
      },
      {
        name: 'Name',
        selector: 'name',
        sortable: true,
      },
    ];
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getAll();
  }

  getAll = async () => {
    try {
      let response = await Server.get({ url: 'device' });
      if (response) {
        this.setState({
          devices: response.devices,
        }, () => this.search(this.state.searchText));
      }
    } catch (error) {
      this.setState({
        loading: false,
        error: error.message,
        donation: {},
      });
    }
  }

  search(searchText) {
    let devicesFiltered = this.state.devices.filter(device =>
      (device.id.toLowerCase().indexOf(searchText) >= 0)
      || (device.name.toLowerCase().indexOf(searchText) >= 0)
    );
    this.setState({ searchText, devicesFiltered });
  }

  render() {
    return (
      <React.Fragment>
        <DeviceModal
          show={this.state.showDeviceModal}
          deviceId={this.state.deviceId}
          deviceName={this.state.deviceName}
          // handleDeviceModalClose={() => { }}
          onClose={() => { this.setState({ showDeviceModal: false }) }}
        />
        <RemoveDeviceModal
          show={this.state.showRemoveDeviceModal}
          // handleDeviceModalClose={() => { }}
          onClose={() => { this.setState({ showRemoveDeviceModal: false }) }}
        />
        <AddDeviceModal
          show={this.state.showAddDeviceModal}
          // handleDeviceModalClose={() => { }}
          onClose={() => { this.setState({ showAddDeviceModal: false }) }}
        />
        <Card style={{ width: "100%" }}>
          <Card.Body>
            <DataTable
              title={<Form.Control type="text" placeholder="Search" style={{ width: "300px" }} onChange={event => this.search(event.target.value)} />}
              striped={true}
              highlightOnHover={true}
              pointerOnHover={true}
              columns={this.columns}
              data={this.state.devicesFiltered}
              onRowClicked={device => this.props.history.push("/device/" + device.id)}
            />
          </Card.Body>
        </Card>
      </React.Fragment>
    );
  }
}
