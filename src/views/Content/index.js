import TestBox from "../TestBox";
import DraggableCard from "../../comppnents/DraggableCard";
import { useState } from "react";

export default function Content() {
  const [open, setOpen] = useState(true);
  if (!open) return;
  return (
    <DraggableCard setOpen={setOpen}>
      <div className="content">
        <header>
          <p>Content Page</p>
        </header>
        <TestBox />
      </div>
    </DraggableCard>
  );
}
