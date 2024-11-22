import React from "react";
import loading from "../assets/loading.gif";

function Loading() {
  return (
    <div className='flex items-center h-screen justify-center'>
      <img src={loading} alt='loading' />
    </div>
  );
}

export default Loading;
