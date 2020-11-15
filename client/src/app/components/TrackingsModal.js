import React from "react";
import {
  Button,
  Modal,
  Table
} from "react-bootstrap";
import DataTable from 'react-data-table-component';
import Moment from 'react-moment';


export default class TrackingsModal extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        name: 'Type',
        selector: 'type',
        sortable: true,
        maxWidth: '12%',
      },
      {
        name: 'Value',
        selector: 'value',
        sortable: true,
        maxWidth: '12%',
      },
      {
        name: 'Latitude',
        selector: 'latitude',
        sortable: true,
        maxWidth: '12%',
      },
      {
        name: 'Longitude',
        selector: 'longitude',
        sortable: true,
        maxWidth: '12%',
      },
      {
        name: 'Origin Timestamp',
        selector: sensor => <Moment date={new Date(sensor.originTimestamp)} />,
        sortable: true,
        sortFunction: (rowA, rowB) => new Date(rowA.originTimestamp).getTime() - new Date(rowB.originTimestamp).getTime()
      },
      {
        name: 'Data Received Timestamp',
        selector: sensor => <Moment date={new Date(sensor.timestamp)} />,
        sortable: true,
        sortFunction: (rowA, rowB) => new Date(rowA.timestamp).getTime() - new Date(rowB.timestamp).getTime()
      },
    ];
  }

  render() {
    return (
      <React.Fragment>
        <Modal size="xl" show={this.props.show} onHide={this.props.onClose}>
          <Modal.Header closeButton>
            <Modal.Title style={{ width: '100%' }}>
              {this.props.device?.id}
              {this.props.device?.name && ' - ' + this.props.device?.name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DataTable
              noHeader={true}
              title={false}
              striped={true}
              highlightOnHover={true}
              columns={this.columns}
              data={this.props.sensors}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.onClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}