import { Box, Container } from "@mui/material";
import { useRouter } from "next/router";
import { useStyles } from "./styles";

const SecondaryNav = ({
  category,
  selected,
  setSelected,
  setSearch,
  id,
  news,
  events,
  business,
  teams,
  color,
  data,
}) => {
  const classes = useStyles();
  const navigate = useRouter();
  console.log({ id });

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

    news && navigate.push(`/ncc/${id}/news?state=${slug}`);
    events && navigate.push(`/ncc/${id}/events?state=${slug}`);
    teams && navigate.push(`/ncc/${id}/committee?state=${slug}`);
    business && navigate.push(`/ncc/${id}/business?state=${slug}`);
  };
  return (
    <Box className={classes.root} sx={color && { backgroundColor: color }}>
      <Container>
        <Box sx={{ padding: "10px 0px" }} className={classes.header}>
          {/* <Typography variant="h5" className={classes.title}>
            News
          </Typography> */}
          {/* {setSearch && <TextField placeholder="Search" name="search" onChange={handleSearch} />} */}
        </Box>
        {data?.length > 0 && (
          <ul className={classes.list}>
            {!teams && (
              <li
                style={{ color: "#000" }}
                className={selected === "ALL" && "active"}
                onClick={() => handleSetSelected("ALL")}
              >
                All
                {/* {JSON.stringify({ selected })} */}
              </li>
            )}

            {category?.map((list, index) => (
              <li
                style={{ color: "#000" }}
                className={checkActive(list?.id)}
                key={index}
                onClick={() => handleSetSelected(list?.id)}
              >
                <div style={{ width: "max-content" }}>{list?.title}</div>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </Box>
  );
};

export default SecondaryNav;
