import React from 'react';

import '../styles/card.css';
import flame from '../img/flame.png';

const Card = () => {
    return (
        <div className="activityTitle mb-6">
            
            <div className="cardTop">
                <h1 className="text-lg ml-4 mt-2">Running</h1>
                <img src={flame} width="40" height="30" />
            </div>
            <div className="cardBottom">
                <div>
                    <div className="circle"></div>
                    <h3 className="mb-4">Current Streak</h3>
                </div>
                <div>
                    <div className="circle"></div>
                    <h3 className="mb-4">Highest Streak</h3>
                </div>
                <div>
                    <div className="circle"></div>
                    <h3 className="mb-4">Point Multiplier</h3>
                </div>
            </div>
        </div>
    );
};

export default Card;
