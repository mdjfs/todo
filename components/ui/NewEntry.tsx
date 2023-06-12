import { AddOutlined, SaveOutlined } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";

export const NewEntry = () => {
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);
  const { addNewEntry } = useContext(EntriesContext);
  const [inputValue, setInputValue] = useState("");
  const [touched, setIsTouched] = useState(false);

  const save = () => {
    if (inputValue.length > 0) {
      addNewEntry(inputValue);
      setIsAddingEntry(false);
      setIsTouched(false);
      setInputValue("");
    }
  };

  return (
    <Box sx={{ marginBottom: 2, paddingX: 1 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder="Nueva entrada"
            autoFocus
            multiline
            label="Nueva entrada"
            helperText={inputValue.length <= 0 && touched && "Ingrese un valor"}
            error={inputValue.length <= 0 && touched}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={() => setIsTouched(true)}
          />
          <Box display="flex" justifyContent="space-between">
            <Button onClick={() => setIsAddingEntry(false)} variant="text">
              Cancelar
            </Button>

            <Button
              endIcon={<SaveOutlined />}
              variant="outlined"
              color="secondary"
              onClick={save}
            >
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          onClick={() => setIsAddingEntry(true)}
          startIcon={<AddOutlined />}
          fullWidth
          variant="outlined"
        >
          Agregar Pendiente
        </Button>
      )}
    </Box>
  );
};
