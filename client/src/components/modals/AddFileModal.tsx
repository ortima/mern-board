import { Modal, ModalContent, StyledBackdrop } from "../styled";
import { AddFileModalProps } from "../../@types/componentsInterfaces";

export const AddFileModal: React.FC<AddFileModalProps> = ({
  open,
  onClose,
  children,
}) => {
  return (
    <Modal
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={open}
      onClose={onClose}
      slots={{ backdrop: StyledBackdrop }}
    >
      <ModalContent>{children}</ModalContent>
    </Modal>
  );
};
