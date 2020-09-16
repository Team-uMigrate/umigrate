import React from "react";
import { ListGroup, Button, Modal } from "react-bootstrap";
import { ThumbUp } from "@material-ui/icons";
import "./UserStyles.css";

const UserView = (props) => (
  <ListGroup.Item>
    <div className="row">
      <div className="col-lg-2 col-md-3 col-sm-6">
        <div className="ImageContainer">Placeholder Image</div>
      </div>
      <div className="col-lg-10">
        <div className="d-flex w-100 justify-content-between">
          {/*Todo: Use <IconButton> instead of <Button>*/}
          <h3 className="mb-1">
            {props.firstName} {props.lastName} -{" "}
            <small>
              {props.city}, {props.country}
            </small>{" "}
            <Button onClick={() => props.handleShow(props)}>
              <ThumbUp />
            </Button>
          </h3>
        </div>
        <div>
          <Modal
            show={props.show}
            onHide={() => props.handleHide()}
            // this dialogClassName isnt allowed to be set by infile css (like the stuff at the bottom of this)
            // has to have its own css file
            dialogClassName="my-modal"
            aria-labelledby="example-custom-modal-styling-title"
          >
            <Modal.Header closeButton style={firstBlock} />
            <Modal.Body style={firstBlock}>
              <img
                src={props.currentUser.photo}
                alt="Avatar"
                style={profilePhoto}
              />
              <button style={messageButton}> Message </button>
            </Modal.Body>
            <Modal.Body style={secondBlock}>
              <h2>
                {props.currentUser.firstName} {props.currentUser.lastName}
              </h2>
              <h6>
                {props.currentUser.age}, {props.currentUser.sex}
              </h6>
              <h6>{props.currentUser.region}</h6>
              <h6>{props.currentUser.current_job}</h6>
              <h6>
                {props.currentUser.enrolled_program},{" "}
                {props.currentUser.current_term}
              </h6>
            </Modal.Body>
            <Modal.Body style={thirdBlock}>
              <h4>About</h4>
              <p>{props.currentUser.bio}</p>
            </Modal.Body>
            <Modal.Body>
              <div
                style={container}
                // these will have to lead to different pages.
                // what im thinking is that if this is clicked,
                // we instead load the page up on its own dedicated site rather than Modal
                // we will need 3 pages for each user, one for exp, one for act, and one for interests
              >
                <a class="" href="/x/">
                  Experience
                </a>
                <a class="" href="/x/">
                  Activites
                </a>
                <a class="" href="/x/">
                  Interests
                </a>
              </div>
            </Modal.Body>
            <Modal.Body style={fourthBlock}>
              <p>
                Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae
                unde commodi aspernatur enim, consectetur. Cumque deleniti
                temporibus ipsam atque a dolores quisquam quisquam adipisci
                possimus laboriosam. Quibusdam facilis doloribus debitis! Sit
                quasi quod accusamus eos quod. Ab quos consequuntur eaque quo
                rem! Mollitia reiciendis porro quo magni incidunt dolore amet
                atque facilis ipsum deleniti rem!
              </p>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  </ListGroup.Item>
);
export default UserView;

const firstBlock = {
  backgroundColor: "lightGrey",
};

const profilePhoto = {
  borderRadius: "100%",
  width: "200px",
  float: "left",
  border: "3px solid LightCyan",
};

const messageButton = {
  zIndex: "9999999999999",
  position: "absolute",
  top: "200px",
  right: "5px",
  bottom: "5px",
  boxSizing: "border-box",
};

const secondBlock = {
  backgroundColor: "LightCyan",
  marginBottom: "10px",
  borderRadius: "10px",
  outline: "1px solid grey",
  padding: "20px",
};

const thirdBlock = {
  backgroundColor: "LightCyan",
  marginBottom: "5px",
  outline: "1px solid grey",
};

const container = {
  listSstyle: "none",
  margin: "0 2px",
  padding: "0",
  display: "flex",
  justifyContent: "space-around",
  marginBottom: "5px",
};

const fourthBlock = {
  backgroundColor: "LightCyan",
  marginBottom: "10px",
  outline: "1px solid grey",
};
