import React, { PureComponent } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class ConfPopup extends PureComponent {
   constructor(props) {
      super(props);
   }
   close = (res) => {
      this.props.onClose(res)
   }

   render() {
      return (
         <Modal show={this.props.show} onHide={() => this.close("Dismissed")}>
            <Modal.Header closeButton>
               <Modal.Title>Testing</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               {this.props.body}
            </Modal.Body>
            <Modal.Footer>
               {this.props.buttons.map((btn, i) => <Button key={i}
               onClick={() => this.props.onClose(btn)}>{btn}</Button>)}
            </Modal.Footer>
         </Modal>
      )
   }
}
