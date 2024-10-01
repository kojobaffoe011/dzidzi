import React from "react";
import { Modal } from "../modal";

import LoginPage from "../../../pages/auth/LoginPage";

const LoginModal = (props) => {
  return (
    <div handleCancel={props.handleCancel} isOpen={props.isOpen}>
      <Modal {...props}>
        <div className="p-4">
          <LoginPage />
        </div>
      </Modal>
    </div>
  );
};

export default LoginModal;
