import React from "react";
import "./GetStarted.scss";
import { NavLink } from 'react-router-dom';

function GetStarted() {
  return (
    <section className="getstarted">
      <h1 className="getstarted__title">Get started in 4 easy steps!</h1>
      <div className="getstarted__group">
      <div className="getstarted__steps">
        <h1 className="getstarted__order">Step 1</h1>
        <p className="getstarted__text">Make an account!</p>
      </div>

      <div className="getstarted__steps">
        <h1 className="getstarted__order">Step 2</h1>
        <p className="getstarted__text">Edit your profile!</p>
      </div>
      </div>

      <div className="getstarted__group">
      <div className="getstarted__steps">
        <h1 className="getstarted__order">Step 3</h1>
        <p className="getstarted__text">Make a Post!</p>
      </div>

      <div className="getstarted__steps">
        <h1 className="getstarted__order">Step 4</h1>
        <p className="getstarted__text">Find work or a developer!</p>
      </div>
      </div>

    <div className="getstarted__button">
        <NavLink to='/signup'><button className="getstarted__signup">Get Started</button></NavLink>
    </div>

    </section>
  );
}

export default GetStarted;
