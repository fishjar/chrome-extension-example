import { useContext } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import AlarmIcon from "@mui/icons-material/Alarm";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FormControlLabel from "@mui/material/FormControlLabel";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material/styles";
import { ColorModeContext } from "../../theme";
import { MaterialUISwitch } from "../../comppnents";
import { getLocalTime } from "../../utils";
import { useApiGetPosts, useApiGetUsers, useApiGetNotfound } from "../../apis";

export default function TestBox() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const [postsState, fetchPosts, abortPosts] = useApiGetPosts({});
  const [usersState, fetchUsers] = useApiGetUsers();
  const [notfoundState, fetchNotfound] = useApiGetNotfound();
  return (
    <div
      style={{
        minWidth: "400px",
      }}
    >
      <p>{getLocalTime()}</p>
      <div>
        {theme.palette.mode} mode
        <IconButton
          sx={{ ml: 1 }}
          onClick={colorMode.toggleColorMode}
          color="inherit"
        >
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </div>
      <FormControlLabel
        control={
          <MaterialUISwitch
            sx={{ m: 1 }}
            checked={theme.palette.mode === "dark"}
            onChange={colorMode.toggleColorMode}
          />
        }
        label={theme.palette.mode + " mode"}
      />
      <Stack spacing={2}>
        <Button
          variant="contained"
          onClick={() => {
            fetchPosts({});
          }}
        >
          Fetch Posts {postsState.status}
        </Button>
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={() => {
            abortPosts();
          }}
        >
          Abort Posts
        </Button>
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={() => {
            fetchUsers({});
          }}
        >
          Fetch Users {usersState.status}
        </Button>
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={() => {
            fetchNotfound({});
          }}
        >
          Fetch Notfound {notfoundState.status}
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
