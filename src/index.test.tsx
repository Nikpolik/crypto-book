import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { triggerMessage, mockedPostMessage } from "./setupTests";
import {
  createSetTickMessage,
  createSubscribeMessage,
  createUpdateLevelsMessage,
  GroupedLevel,
  ProductId,
} from "./lib/levelsFeed";

const levels: GroupedLevel[] = [
  {
    total: 1,
    cumulativeTotal: 1,
    price: 1,
    size: 1,
  },
];

const mockData = {
  bids: levels,
  asks: levels,
  tick: 2.5,
  activeProductId: "PI_XBTUSD" as ProductId,
};

describe("App", () => {
  it("renders without an error", () => {
    render(<App />);
  });

  describe("When the worker responds with data", () => {
    beforeEach(() => {
      render(<App />);
      triggerMessage(createUpdateLevelsMessage(mockData));
    });

    afterEach(() => {
      cleanup();
    });

    it("shows the correct active product id", async () => {
      await waitFor(() => {
        const activeProductId =
          screen.getByTestId("active-product").textContent;

        expect(activeProductId).toEqual(mockData.activeProductId);
      });
    });

    it("shows the correct tick", async () => {
      await waitFor(() => {
        const options = screen.getAllByTestId("tick-option");
        const selectedOption = options.find((o: any) => o.selected);
        const selectedTick = selectedOption?.textContent;

        expect(selectedTick).toEqual(mockData.tick.toString());
      });
    });

    it("renders all asks", async () => {
      await waitFor(() => {
        const asks = screen.getByTestId("asks");

        expect(asks.children.length).toEqual(levels.length + 1);
      });
    });

    it("renders all bids", async () => {
      await waitFor(() => {
        const asks = screen.getByTestId("asks");

        expect(asks.children.length).toEqual(levels.length + 1);
      });
    });
  });

  describe("User actions", () => {
    beforeEach(() => {
      render(<App />);
      // setup initial active coin;
      triggerMessage(createUpdateLevelsMessage(mockData));
    });

    afterEach(() => {
      cleanup();
    });

    describe("when the user selects a tick", () => {
      it("sends the correct set tick message to the worker", async () => {
        const select = screen.getByTestId("tick-select");
        userEvent.selectOptions(select, "0.5");

        await waitFor(() => {
          expect(mockedPostMessage).toBeCalledWith(createSetTickMessage(0.5));
        });
      });
    });

    describe("when the user toggles to the other coin", () => {
      it("sends the correct subscription message to the worker", async () => {
        const toggleButton = screen.getByTestId("toggle-button");
        fireEvent.click(toggleButton);

        await waitFor(() => {
          expect(mockedPostMessage).toBeCalledWith(
            createSubscribeMessage("PI_ETHUSD", 0.05)
          );
        });
      });
    });
  });
});
