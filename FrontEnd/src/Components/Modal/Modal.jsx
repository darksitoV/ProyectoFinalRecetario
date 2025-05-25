import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function AlertModal({ open, onClose, message, isError }) {
  const navigate = useNavigate();

  const handleAction = () => {
    onClose(); // Cierra el modal en ambos casos
    if (!isError) {
      navigate('/login'); // Redirige solo si no hay error
    }
    // Si hay error (isError=true), no hace nada más (el usuario se queda en la misma página)
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography 
          id="modal-modal-title" 
          variant="h6" 
          component="h2"
          color={isError ? "error" : "success.main"}
        >
          {isError ? "❌ Error" : "✅ Éxito"}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {message}
        </Typography>
        <Button 
          onClick={handleAction} // Usa la función unificada
          variant="contained"
          color={isError ? "error" : "success"}
          sx={{ mt: 3 }}
        >
          {isError ? "Reintentar" : "Continuar"}
        </Button>
      </Box>
    </Modal>
  );
}