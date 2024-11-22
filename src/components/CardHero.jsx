import React from "react";

function CardHero({ image, title, customStyle, customSyleImg, click }) {
  return (
    <div
      onClick={click}
      className={`${customStyle}bg-base-100  p-4 rounded-xl shadow-2xl`}
    >
      <figure>
        <img
          className={`${customSyleImg}object-cover rounded-lg `}
          src={image}
          alt={title}
        />
      </figure>
      <div>
        <h2 className='text-amber-900 text-xl pt-3 text-center font-bold'>
          {title}
        </h2>
      </div>
    </div>
  );
}

export default CardHero;
