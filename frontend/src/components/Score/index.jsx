import React, { useEffect } from 'react';

import './style.less';

import logo from '../../assets/score.svg';
import badScore from '../../assets/bad_score.svg';
import goodScore from '../../assets/good_score.svg';

let image = logo;
let color = '#000000';
const Score = props => {
  useEffect(() => {
    if (props.score <= 2.7) {
      image = badScore;
      color = '#E76070';
    } else {
      image = goodScore;
      color = '#72D66A';
    }
  });

  return (
    <div className="score-card">
      <div className="score-wrapper">
        <h1 className="title">Previous Place Score</h1>
        <div className="horizontal-items .fade-in">
          <img src={props.score <= 2.7 ? badScore : goodScore} alt="icon" className=".fade-in"/>
          <h1 className=".fade-in" style={{
              color: `${props.score <= 2.7 ? '#E76070' : '#72D66A'}`
            }}>{props.grade}</h1>
        </div>
      </div>
    </div>
  );
};

export default Score;
