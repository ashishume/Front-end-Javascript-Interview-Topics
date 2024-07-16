import { useEffect } from "react";
import "./styles.scss";
const SnackbarComponent = ({
  open,
  onClose,
  message,
}: {
  open: boolean;
  onClose: () => void;
  message: string;
}) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [open, onClose]);
  return open ? (
    <div className={`snackbar ${open ? "show" : ""}`}>{message}</div>
  ) : null;
};

export default SnackbarComponent;
