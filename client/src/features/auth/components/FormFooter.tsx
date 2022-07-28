import { Button, Divider } from "@mui/material";
import { Link } from "react-router-dom";

interface FormFooterProps {
  title: string;
  link: string;
  btnText: string;
}

export const FormFooter = ({ title, link, btnText }: FormFooterProps) => {
  return (
    <div style={{ marginTop: "16px" }}>
      <Divider>
        <small style={{ color: "#767676" }}>{title}</small>
      </Divider>

      <Link to={link} style={{ textDecoration: "none", color: "#fe6d73" }}>
        <Button
          variant="contained"
          style={{
            width: "100%",
            marginTop: 16,
            height: 31,
            backgroundColor: "#767676",
            color: "#edf2f4",
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          {btnText}
        </Button>
      </Link>
    </div>
  );
};
