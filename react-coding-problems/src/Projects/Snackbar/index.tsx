import { Button } from "@mui/material";
import SnackbarComponent from "./snackbarComponent";
import { useState } from "react";

const SnackbarHome = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleOpenSnackbar = () => {
    setOpen(true);
    setMessage("This is a sample snackbar message");
  };

  const handleCloseSnackbar = () => {
    setOpen(false);
    setMessage("");
  };

  return (
    <div>
      <Button onClick={handleOpenSnackbar}>Show snackbar</Button>
      <SnackbarComponent
        open={open}
        onClose={handleCloseSnackbar}
        message={message}
      />
    </div>
  );
};

export default SnackbarHome;
