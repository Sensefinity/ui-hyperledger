import React from "react";
import {
  Button,
  Modal,
  Form
} from "react-bootstrap";

export default class ProductModal extends React.Component {
    constructor(props, context) {
      super(props, context);
    }
  
    render() {
      return (
        <>
          <Modal show={this.props.show} onHide={this.props.onClose}>
            <Modal.Header closeButton>
              <Modal.Title>Product Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="productId">
                  <Form.Label>Product ID: </Form.Label>
                  <Form.Control type="text" value={this.props.productId} />
                </Form.Group>
                <Form.Group controlId="productName">
                    <Form.Label>Product Name: </Form.Label>
                    <Form.Control type="text" value={this.props.productName} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.props.onClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={this.props.onClose}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
  }