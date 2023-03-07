import { useContext } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import AlarmIcon from "@mui/icons-material/Alarm";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ThemeContext, themeToCheck, checkToTheme } from "../../theme";
import { MaterialUISwitch } from "../../comppnents";
import { getLocalTime } from "../../utils";
import "./App.css";

function App() {
  const { themeName, setThemeName } = useContext(ThemeContext);
  return (
    <div className="App">
      <header className="App-header">
        <p>Options Page</p>
        <p>Theme: {themeName}</p>
        <p>Now: {getLocalTime()}</p>
      </header>
      <FormControlLabel
        control={
          <MaterialUISwitch
            sx={{ m: 1 }}
            checked={themeToCheck(themeName)}
            onChange={(e) => setThemeName(checkToTheme(e.target.checked))}
          />
        }
        label="MUI switch"
      />
      <Stack direction="row" spacing={2}>
        <Button variant="contained">Hello World</Button>
        <Button variant="outlined" startIcon={<DeleteIcon />}>
          Delete
        </Button>
        <Button variant="contained" endIcon={<SendIcon />}>
          Send
        </Button>
      </Stack>
      <Stack direction="row" spacing={1}>
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="delete" disabled color="primary">
          <DeleteIcon />
        </IconButton>
        <IconButton color="secondary" aria-label="add an alarm">
          <AlarmIcon />
        </IconButton>
        <IconButton color="primary" aria-label="add to shopping cart">
          <AddShoppingCartIcon />
        </IconButton>
      </Stack>
    </div>
  );
}

export default App;
