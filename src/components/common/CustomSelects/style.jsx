import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  creatableSelectAdd: {
    background: "#F3FBFF",
    position: "sticky",
    bottom: 0,
    zIndex: 100,
    fontWeight: 600,
    display: "flex",
    justifyContent: "center",
    transition: "150ms all ease-in-out",
    cursor: "pointer",
    padding: "5px",
    "&:hover": {
      background: "#E1F5FF",
    },
  },
}));
export default styles;
