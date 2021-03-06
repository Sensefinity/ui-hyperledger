import React from "react";
import {
  Button,
  Modal,
  Form
} from "react-bootstrap";

export default class AddDeviceModal extends React.Component {
    constructor(props, context) {
      super(props, context);
    }
  
    render() {
      return (
        <>
          <Modal show={this.props.show} onHide={this.props.onClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Device</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="deviceId">
                  <Form.Label>Device ID: </Form.Label>
                  <Form.Control type="text" placeholder="Device ID" />
                </Form.Group>
                <Form.Group controlId="deviceName">
                    <Form.Label>Device Name: </Form.Label>
                    <Form.Control type="text" placeholder="Device Name" />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.props.onClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={this.props.onClose}>
                Add
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
  }