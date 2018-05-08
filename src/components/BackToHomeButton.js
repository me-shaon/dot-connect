import React from 'react';
import { Link } from 'react-router-dom';

const BackToHomeButton = () => (
    <button className="button is-primary back">
        <Link to="/"> Go Home </Link>
    </button>
);

export default BackToHomeButton;
