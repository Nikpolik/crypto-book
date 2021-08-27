import { useSelector } from "react-redux";
import styled from "styled-components";
import useMediaQuery from "../../hooks/useMediaQuery";
import { GroupedLevel } from "../../lib/levelsFeed";
import { RootState } from "../../store";
import Text from "../Text";
import { media } from "../../theme/media";
import Row from "./Row";
import Levels from "./Levels";

const HEADER_LABELS: PartialRecord<keyof GroupedLevel, string> = {
  price: "Price",
  size: "Size",
  total: "Total",
};

const FIELDS: Array<keyof GroupedLevel> = ["total", "size", "price"];
const REVERSED_FIELDS: Array<keyof GroupedLevel> = ["price", "size", "total"];

const Container = styled.div`
  display flex;
  flex-direction: row;
  margin-bottom: 16px;
  height: calc(100% - 40px - 100px);
  overflow-y: auto;
  width: 100%;

  @media ${media.mobile} {
    flex-direction: column;
  }
`;

const Column = styled.div`
  width: calc(50% - 16px);
  padding: 8px;

  @media ${media.mobile} {
    width: calc(100% - 16px);
  }
`;

const HeaderItem = styled(Text)`
  color: ${({ theme }) => theme.colors.lightText};
  font-size: ${({ theme }) => theme.fontSizes.lg}px;
  width: 70px;
  display: block;
`;

const ProductText = styled(Text)`
  width: 100%;
  text-align: center;
  display: inline-block;
`;

const selector = (state: RootState) => ({
  levels: state.feed.levels,
  activeProductId: state.feed.activeProductId,
});

const Feed = () => {
  let {
    levels: { bids, asks },
    activeProductId,
  } = useSelector(selector);
  const isMobile = useMediaQuery(media.mobile);

  const askFields = isMobile ? FIELDS : REVERSED_FIELDS;
  const maxBidLevel = bids[bids.length - 1]?.cumulativeTotal;
  const maxAskLevel = asks[asks.length - 1]?.cumulativeTotal;

  if (isMobile) {
    // state is immutable so we must make a copy first before reversing
    bids = [...bids].reverse();
  }

  return (
    <Container>
      <Column data-testid="bids">
        <Row>
          {FIELDS.map((field) => (
            <HeaderItem key={field}>{HEADER_LABELS[field]}</HeaderItem>
          ))}
        </Row>
        <Levels
          levels={bids}
          fields={FIELDS}
          maxLevel={maxBidLevel}
          priceColor="green"
          graphColor="transparentGreen"
          graphDirection={isMobile ? "left" : "right"}
        />
      </Column>
      {isMobile && (
        <Column>
          <ProductText>{activeProductId}</ProductText>
        </Column>
      )}
      <Column data-testid="asks">
        <Row>
          {askFields.map((field) => (
            <HeaderItem key={field}>{HEADER_LABELS[field]}</HeaderItem>
          ))}
        </Row>
        <Levels
          levels={asks}
          fields={askFields}
          maxLevel={maxAskLevel}
          priceColor="red"
          graphColor="transparentRed"
          graphDirection="left"
        />
      </Column>
    </Container>
  );
};

export default Feed;
