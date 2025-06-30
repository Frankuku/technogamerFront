import { Toast, ToastContainer } from "react-bootstrap";

const ToastMessage = ({ show, onClose, message, bg = "success" }) => {
  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast bg={bg} show={show} onClose={onClose} delay={3000} autohide>
        <Toast.Header closeButton>
          <strong className="me-auto">Notificación</strong>
        </Toast.Header>
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastMessage;
