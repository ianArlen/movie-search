import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Movie from "./Movie";
import "./AppPagination.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    padding: theme.spacing(1),
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "0px",
    marginLeft: "13%",
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "1rem",
  },
}));

export default function AppPagination(props) {
  const { movies } = props;
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;

  const classes = useStyles();

  useEffect(() => {
    if (movies) {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(movies.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(movies.length / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage, movies]);

  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    const newOffset = selectedPage * itemsPerPage;
    setItemOffset(newOffset);
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Grid container spacing={2} style={{ marginLeft: 0, marginRight: 0 }}>
          {currentItems.map((movie, key) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={key}>
              <Movie movie={movie} />
            </Grid>
          ))}
        </Grid>
      </div>
      <div className={classes.paginationContainer}>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName="pagination-container"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="active"
        />
      </div>
    </div>
  );
}
