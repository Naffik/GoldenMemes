import React, { useState } from "react";
import styles from "./Filters.module.scss";
import Tile from "../../components/Tile";
import { ReactComponent as FireIcon } from "../../assets/svg/fire_emoji.svg";
import { ReactComponent as StopwatchIcon } from "../../assets/svg/stopwatch_emoji.svg";
import { ReactComponent as ConfettiIcon } from "../../assets/svg/confetti_emoji.svg";
import { ReactComponent as RandomIcon } from "../../assets/svg/random_icon.svg";

function Filters({ onClickFilter }) {
  const [active, setActive] = useState(1);

  const tiles = [
    { text: "Gorące", icon: <FireIcon />, endpoint: "hot" },
    { text: "Najnowsze", icon: <StopwatchIcon />, endpoint: "fresh" },
    { text: "Najlepsze", icon: <ConfettiIcon />, endpoint: "" },
    { text: "Losowe", icon: <RandomIcon />, endpoint: "" },
  ];

  const handleTileClick = (index, name) => {
    setActive(index);
    onClickFilter(name);
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
            onClick={() => handleTileClick(idx, tile.endpoint)}
          />
        );
      })}
    </div>
  );
}

export default Filters;
