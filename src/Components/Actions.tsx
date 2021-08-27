import { FC } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Button from "./Button";
import { RootState } from "../store";
import { worker } from "../App";
import {
  createHcfMessage,
  createSubscribeMessage,
  ProductId,
  validTicks,
} from "../lib/levelsFeed";

const Container = styled.div`
  display: flex;
  justify-content: center;
  grid-gap: 8px;
`;

const Actions: FC = () => {
  const activeProductId = useSelector(
    (state: RootState) => state.feed.activeProductId
  );

  const handleToggleClick = () => {
    const productId: ProductId =
      activeProductId === "PI_ETHUSD" ? "PI_XBTUSD" : "PI_ETHUSD";
    const defaultTick = validTicks[productId][0];

    worker.postMessage(createSubscribeMessage(productId, defaultTick));
  };

  const handleKillClick = () => {
    worker.postMessage(createHcfMessage());
  };

  return (
    <Container>
      <Button data-testid="toggle-button" onClick={handleToggleClick}>
        Toggle Feed
      </Button>
      <Button onClick={handleKillClick} color="red">
        Kill Feed
      </Button>
    </Container>
  );
};

export default Actions;
