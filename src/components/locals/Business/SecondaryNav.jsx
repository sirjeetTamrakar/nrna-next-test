import { Box, Container, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import { useStyles } from "./styles";

const SecondaryNav = ({ category, selected, setSelected, setSearch }) => {
  const classes = useStyles();
  const navigate = useRouter();

  const checkActive = (slug) => {
    if (selected) {
      if (slug === selected) {
        return "active";
      } else return "";
    } else if (slug === category?.[0]?.id) {
      return "active";
    } else {
      return "";
    }
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleSetSelected = (slug) => {
    setSelected(slug);
    navigate.push(`/business?state=${slug}`);
  };
  return (
    <Box className={classes.root}>
      <Container>
        <Box sx={{ padding: "10px 0px" }} className={classes.header}>
          <Typography variant="h5" className={classes.title}>
            Business
          </Typography>
          <TextField
            className={classes.search_bar}
            placeholder="Search"
            name="businessSearch"
            onChange={handleSearch}
          />
        </Box>
        <ul className={classes.list}>
          <li
            className={selected === "ALL" && "active"}
            onClick={() => handleSetSelected("ALL")}
          >
            Home
            {/* {JSON.stringify({ selected })} */}
          </li>
          {category?.map((list, index) => (
            <li
              className={checkActive(list?.id)}
              key={index}
              onClick={() => handleSetSelected(list?.id)}
            >
              {list?.title}
            </li>
          ))}
        </ul>
      </Container>
    </Box>
  );
};

export default SecondaryNav;
