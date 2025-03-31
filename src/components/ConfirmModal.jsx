import React from "react";
import "./ConfirmModal.css";

const ConfirmModal = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={onCancel} className="modal-button cancel">
            Hủy
          </button>
          <button onClick={onConfirm} className="modal-button confirm">
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal; 