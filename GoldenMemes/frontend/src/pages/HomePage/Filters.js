import React, { useState } from "react";
import styles from "./Filters.module.scss";
import Tile from "../../components/Tile";
import { ReactComponent as FireIcon } from "../../assets/svg/fire_emoji.svg";
import { ReactComponent as StopwatchIcon } from "../../assets/svg/stopwatch_emoji.svg";
import { ReactComponent as ConfettiIcon } from "../../assets/svg/confetti_emoji.svg";
import { ReactComponent as RandomIcon } from "../../assets/svg/random_icon.svg";

function Filters() {
  const [active, setActive] = useState(1);

  const tiles = [
    { text: "Gorące", icon: <FireIcon /> },
    { text: "Najnowsze", icon: <StopwatchIcon /> },
    { text: "Najlepsze", icon: <ConfettiIcon /> },
    { text: "Losowe", icon: <RandomIcon /> },
  ];

  const handleTileClick = (index) => {
    setActive(index);
  };

  return (
    <div className={styles.container}>
      {tiles.map((tile, idx) => {
        return (
          <Tile
            key={idx}
            text={tile.text}
            icon={tile.icon}
            active={active === idx ? true : false}
            onClick={() => handleTileClick(idx)}
          />
        );
      })}
    </div>
  );
}

export default Filters;
