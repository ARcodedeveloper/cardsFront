import { Grid } from "@mui/material";
import { arrayOf } from "prop-types";
import React from "react";
import cardType from "../models/types/cardType";
import CardBussinesComponent from "./card/CardBussinesComponent";

export default function Cards({ cards, handleDelete, handleLike }) {
  const handleEdit = (id) => {
    //console.log(`Card ${id} is Edited`);
  };
  
  //console.log('Cards props: ', { cards });
  

  return (
    <>
      <Grid container spacing={2}>
        {cards.map((card) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={card._id}>
            <CardBussinesComponent
              card={card}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleLike={handleLike}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

Cards.propTypes = {
  cards: arrayOf(cardType),
};
