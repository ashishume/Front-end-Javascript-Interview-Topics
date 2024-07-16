import { Button } from "@mui/material";
import SnackbarComponent from "./snackbarComponent";
import { useState } from "react";

const SnackbarHome = () => {
  /** u can write these methods from line 7 to line 18 into separate hook method and import from there to re use in different components */
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
