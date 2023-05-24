import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";

export const ImageGallery = ({ images, openImg }) => (
  <ImageList sx={{ width: 1280, height: "auto" }} gap={10} cols={3}>
    {images.map(({ id, webformatURL, largeImageURL }) => (
      <ImageListItem key={nanoid()} onClick={() => openImg(largeImageURL)}>
        <img
          style={{ borderRadius: 5 }}
          src={webformatURL}
          alt={id}
          loading="lazyload"
        />
      </ImageListItem>
    ))}
  </ImageList>
);

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  openImg: PropTypes.func.isRequired,
  id: PropTypes.string,
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
};
