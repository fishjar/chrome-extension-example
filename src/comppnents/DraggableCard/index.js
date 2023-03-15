import Draggable from "react-draggable";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function DraggableBox(props) {
  return (
    <Draggable handle=".draggable-handle" defaultPosition={{ x: 0, y: 0 }}>
      <Card
        sx={{
          position: "fixed",
          left: "50%",
          top: "50%",
          zIndex: 2147483647,
        }}
      >
        <CardHeader
          className="draggable-handle"
          title="CardHeader"
          sx={{
            borderBottom: "1px solid #666",
            cursor: "move",
          }}
          action={
            <IconButton
              aria-label="close"
              onClick={() => {
                props.setOpen(false);
              }}
            >
              <CloseIcon />
            </IconButton>
          }
        />
        <CardContent>{props.children}</CardContent>
      </Card>
    </Draggable>
  );
}
