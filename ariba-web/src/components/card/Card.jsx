import React from "react";

const Card = ({ style, present, name, details }) => {
  return (
    <div className="card  w-full bg-white card-sm rounded-sm">
      <div className={`${style} card-body`}>
        <h2 className="card-title">Small Card</h2>
        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p>
        <p>{present ? present : null}</p>
      </div>
    </div>
  );
};

export default Card;
