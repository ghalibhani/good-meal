import React from "react";

function CardHero({ image, title, customStyle }) {
  return (
    <div class={`${customStyle}bg-base-100 w-48 p-4 rounded-xl shadow-2xl`}>
      <figure>
        <img
          className='object-cover rounded-lg w-48 h-48'
          src={image}
          alt={title}
        />
      </figure>
      <div>
        <h2 class='text-amber-900 text-xl pt-3 text-center font-bold'>
          {title}
        </h2>
      </div>
    </div>
  );
}

export default CardHero;
