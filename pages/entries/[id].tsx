import {
  DeleteOutline,
  SaveAltOutlined,
  SaveOutlined,
} from "@mui/icons-material";
import {
  Button,
  capitalize,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  useTheme,
} from "@mui/material";
import { isValidObjectId } from "mongoose";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, FC, useContext, useMemo, useState } from "react";
import { entriesApi } from "../../apis";
import { Layout } from "../../components/layouts";
import { EntriesContext } from "../../context/entries";
import { db } from "../../database";
import { Entry, EntryStatus } from "../../interfaces";
import { Entry as EntryModel } from "../../models";
import { getFormatDistanceToNow } from "../../utils";

// const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];

 const validStatus: EntryStatus[] = ["pending",  "finished"];

interface Props {
  entry: Entry;
}

export const EntryPage: FC<Props> = ({ entry }) => {
  const router = useRouter();
  const { updateEntry, deleteEntry } = useContext(EntriesContext);

  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);

  const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  };

  const onSave = () => {
    updateEntry(entry._id, { description: inputValue, status });
    router.push("/");
  };

  const onDelete = async () => {
    await deleteEntry(entry._id);
    router.push("/");
  };

  const isValid = useMemo(() => inputValue.length > 0, [inputValue]);

  const hasError = useMemo(() => !isValid && touched, [isValid, touched]);

  return (
    <Layout title={inputValue}>
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={status === "pending" ? `Falta: ${inputValue}` : inputValue}
              subheader={getFormatDistanceToNow(entry.createdAt)}
            />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder="Ej. Jogger"
                autoFocus
                multiline
                label="Necesitamos"
                value={inputValue}
                onChange={onTextFieldChanged}
                helperText={hasError && "¿Que necesitamos?"}
                onBlur={() => setTouched(true)}
                error={hasError}
              />

              <FormControl sx={{ paddingTop: 2.5 }}>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup row onChange={onStatusChanged}>
                  {validStatus.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      checked={status === option}
                      control={<Radio />}
                      label={option === "pending" ? "Pendiente" : "Listo"}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              
              <Button
                startIcon={<DeleteOutline />}
                fullWidth
                variant="contained"
                onClick={() => confirm(`¿Quieres borrar ${inputValue}?`) ? onDelete() : void 0}
                disabled={!isValid}
                style={{color: "white", backgroundColor: "red"}}
              >
                Eliminar
              </Button>
              <Button
                startIcon={<SaveOutlined />}
                fullWidth
                variant="contained"
                onClick={onSave}
                disabled={!isValid}
                style={{color: "white"}}
              >
                Guardar
              </Button>
              
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let entry = undefined;

  if (params && params.id && isValidObjectId(params.id)) {
    db.connect();
    entry = await EntryModel.findById(params.id);
    db.disconnect();
  }

  if (!entry) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      entry: {
        _id: params?.id,
        status: entry.status,
        description: entry.description,
        createdAt: entry.createdAt,
      },
    },
  };
};

export default EntryPage;
