import React from "react";
import { Modal } from "react-bootstrap";
import YouTube from "@u-wave/react-youtube";

export default function YoutubeModal(props) {
  return (
    <div>
      <Modal
        {...props}
        size="lg"
        dialogClassName="modal-90h modal-fade"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header id="modal-head" closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h4>
              {props.movieID.name ? props.movieID.name : "Untitled Movie"}
            </h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body id="modal-body">
          <div className="d-flex justify-content-center">
            <YouTube
              video={props.movieID.key ? props.movieID.key : "fT7pFSfVZBI"}
              allowFullscreen
              height="480px"
              width="600px"
              controls
            />
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
      </Modal>
    </div>
  );
}
