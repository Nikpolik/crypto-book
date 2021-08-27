import { useSelector } from "react-redux";
import styled from "styled-components";
import { ConnectionState } from "../lib/levelsFeed";
import { RootState } from "../store";
import Text from "./Text";

const Container = styled.span`
  position: absolute;
  min-width: 72px;
  right: 32px;
  top: 8px;
  background-color: ${({ theme }) => theme.colors.red};
  border-radius: 8px;
  padding: 8px;
  z-index: 999;
`;

const StatusText = styled(Text)``;

const selector = (state: RootState) => ({
  readyState: state.connection.readyState,
  error: state.connection.error,
});

const ConnectionStatus = () => {
  const { error, readyState } = useSelector(selector);

  if (readyState === ConnectionState.OPEN && !error) return null;

  return (
    <Container>
      <StatusText as="p" data-test-id="connection">
        Connection : {readyState}
      </StatusText>
      <StatusText data-test-id="error" as="p">
        {error}
      </StatusText>
    </Container>
  );
};

export default ConnectionStatus;
