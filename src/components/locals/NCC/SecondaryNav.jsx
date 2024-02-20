import { Box, Container, TextField, Typography } from "@mui/material";
import { useStyles } from "./styles";

const SecondaryNav = ({ category, selected, setSelected, setSearch }) => {
  const classes = useStyles();

  const checkActive = (slug) => {
    if (slug === selected) {
      return "active";
    } else return "";
  };
  const handleSetSelected = (slug) => {
    setSelected(slug);
    // navigate(`/nrna/business`, { state: slug });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <Box className={classes.root}>
      <Container>
        <Box paddingY={2} className={classes.header}>
          <Typography variant="h5" className={classes.title}>
            NCC
          </Typography>
          <TextField
            placeholder="Search"
            name="nccSearch"
            onChange={handleSearch}
          />
        </Box>
        <ul className={classes.list}>
          <li
            className={selected === "ALL" && "active"}
            onClick={() => handleSetSelected("ALL")}
          >
            Home
          </li>
          {category?.map((list, index) => (
            <li
              className={checkActive(list?.slug)}
              key={index}
              onClick={() => handleSetSelected(list?.slug)}
            >
              <div style={{ width: "max-content", padding: "0px 10px" }}>
                {list?.title}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Box>
  );
};

export default SecondaryNav;
