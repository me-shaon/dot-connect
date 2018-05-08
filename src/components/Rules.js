import React from 'react';
import BackToHomeButton from './BackToHomeButton';

const Rules = () => (
    <div>
        <p>
            Each player in turn connects dots. Click dots to connect them. If
            your connection makes a box, you get a point and another move. You
            can not pass move. Whoever gets most points wins.
        </p>
        <BackToHomeButton />
    </div>
);

export default Rules;
