import { makeStyles } from "@mui/styles";

const usestyles = makeStyles((theme) => ({
  root: {
    height: "calc(100vh - 100px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    width: "400px",

    background: "#ebf5fe",
    borderRadius: "6px",
    padding: "10px 30px",
  },
}));

export default usestyles;
