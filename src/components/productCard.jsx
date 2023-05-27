import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { useState } from "react";

export default function ProductCard({ product, setUser, user, favorite }) {
  const [isFavorite, setIsFavorite] = useState(favorite);
  function addToFavorite() {
    setUser({ ...user, favorites: [...user.favorites, product] });
    setIsFavorite(true);
  }
  function removeFromFavorites() {
    let newArray = user.favorites.filter((e) => e.id != product.id);
    setUser({ ...user, favorites: newArray });
    setIsFavorite(false);
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader title={product.title} />
      <CardMedia
        component="img"
        height="194"
        image={product.thumbnail}
        alt={product.title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          onClick={() => {
            if (isFavorite) {
              removeFromFavorites();
            } else {
              addToFavorite();
            }
          }}
          aria-label="add to favorites"
        >
          <FavoriteIcon color={isFavorite ? "error" : ""} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
