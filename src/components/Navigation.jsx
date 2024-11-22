import React from "react";

function Navigation() {
  return (
    <div className='navbar px-10 shadow bg-base-100 fixed z-10'>
      <div className='flex-1'>
        <a href='/' className='btn btn-ghost text-3xl text-accent'>
          Good Meal
        </a>
      </div>
      <div className='flex-none gap-2'>
        <div className='form-control'>
          <input
            type='text'
            placeholder='Search'
            className='input input-bordered w-24 md:w-auto'
          />
        </div>
      </div>
    </div>
  );
}

export default Navigation;
