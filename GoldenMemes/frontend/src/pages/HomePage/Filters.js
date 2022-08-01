import React from "react";
import styles from "./Filters.module.scss";
import Tile from "../../components/Tile";
import { ReactComponent as FireIcon } from "../../assets/svg/fire_emoji.svg";
import { ReactComponent as StopwatchIcon } from "../../assets/svg/stopwatch_emoji.svg";
import { ReactComponent as ConfettiIcon } from "../../assets/svg/confetti_emoji.svg";
import { ReactComponent as RandomIcon } from "../../assets/svg/random_icon.svg";

function Filters() {
  return (
    <div className={styles.container}>
      <Tile text="Gorące" icon={<FireIcon />} />
      <Tile text="Najnowsze" icon={<StopwatchIcon />} active={true} />
      <Tile text="Najlepsze" icon={<ConfettiIcon />} />
      <Tile text="Losowe" icon={<RandomIcon />} />
    </div>
  );
}

export default Filters;
