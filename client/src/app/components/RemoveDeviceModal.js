import React from "react";
import {
  Button,
  Modal
} from "react-bootstrap";

export default class RemoveDeviceModal extends React.Component {
    constructor(props, context) {
      super(props, context);
    }
  
    render() {
      return (
        <>
          <Modal show={this.props.show} onHide={this.props.onClose}>
            <Modal.Header closeButton>
              <Modal.Title>Device Name</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure want to delete this device?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.props.onClose}>
                Yes
              </Button>
              <Button variant="primary" onClick={this.props.onClose}>
                No
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
  }