import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";

export default function Warning() {
  const [open, setOpen] = useState(false);
  return (
    <Container>
      <Button onClick={() => setOpen(true)} variant="contained">
        Contained
      </Button>
      <Dialog open={open} onClose={() => false}>
        <DialogTitle>คำเตือน</DialogTitle>
        <DialogContent>
          <DialogContentText className="w-96">อาหารชนิดนี้อันตรายต่อคุณ</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
