import { ChangeEvent } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { worker } from "../App";
import Text from "./Text";
import { createSetTickMessage, validTicks } from "../lib/levelsFeed";
import { RootState } from "../store";
import Select from "./Select";
import useMediaQuery from "../hooks/useMediaQuery";
import media from "../theme/media";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  width: 100%;
`;

const ProductText = styled(Text)`
  text-align: center;
`;

const Title = styled(Text)`
  flex: 1;
`;

const SelectWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const selector = (state: RootState) => ({
  activeProductId: state.feed.activeProductId,
  tick: state.feed.tick,
});

const Header = () => {
  const { activeProductId, tick } = useSelector(selector);
  const ticks = validTicks[activeProductId];
  const isMobile = useMediaQuery(media.mobile);

  const handleTickChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = parseFloat(e.target.value);
    worker.postMessage(createSetTickMessage(value));
  };

  return (
    <Container>
      <Title fontSize="xxxlg">Order Book</Title>
      {!isMobile && (
        <ProductText data-testid="active-product">
          {activeProductId}
        </ProductText>
      )}
      <SelectWrapper>
        <Select
          data-testid="tick-select"
          value={tick}
          onChange={handleTickChange}
        >
          {ticks.map((t) => (
            <option data-testid="tick-option" key={t} value={t}>
              {t}
            </option>
          ))}
        </Select>
      </SelectWrapper>
    </Container>
  );
};

export default Header;
