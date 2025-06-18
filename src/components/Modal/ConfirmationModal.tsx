"use client";

import Modal from "./Modal";
import Button from "../Button/Button";
import { ConfirmationModalProps } from "./types";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}: ConfirmationModalProps) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} className="max-w-sm">
      <div className="flex gap-6 flex-col">
        <p className="text-gray-600">{message}</p>

        <div className="flex gap-3 justify-end">
          <Button
            variant="outlined"
            onClick={onClose}
            className="w-auto px-4 py-2"
          >
            Cancel
          </Button>
          <Button
            variant={"outlined"}
            onClick={handleConfirm}
            className={
              "w-auto px-4 py-2 text-red-600 border-red-600 hover:bg-red-50"
            }
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
