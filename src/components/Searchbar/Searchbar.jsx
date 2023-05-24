import Button from "@mui/material/Button";
import PropTypes from "prop-types";

import css from "../Searchbar/Searchbar.module.css";

export const Searchbar = ({ onSubmit }) => {
  return (
    <header className={css.searchbar}>
      <form className={css.searchbar__form} onSubmit={onSubmit}>
        <input
          className="input"
          name="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <Button variant="contained">Search</Button>
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
