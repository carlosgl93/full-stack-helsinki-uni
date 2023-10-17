import { UiContext } from "../state/ui";
import { useContext } from "react";

export const Toast = () => {
  const { toast } = useContext(UiContext);
  const { severity, message } = toast;

  return (
    <section
      style={{
        display: "flex",
        zIndex: "9000",
        justifyContent: "center",
        flexDirection: "column",
        borderRadius: "10px",
        padding: "10px",
      }}
    >
      <header
        style={{
          textTransform: "capitalize",
          display: "block",
        }}
      >
        <h3>{severity}</h3>
      </header>
      <p>{message}</p>
    </section>
  );
};
