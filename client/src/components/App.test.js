import { render, screen,cleanup, waitFor } from "@testing-library/react";
import BookShow from "./BookShow";
import * as api from "./api";

jest.mock("./api");
afterEach(cleanup);
describe("BookShow Component", () => {

    // After each test clear the mock
    beforeEach(() => jest.clearAllMocks());
  
    it("should render details when api responds", async () => {
      // For this test, when getBookingDetailsApi is called
      // return the given value wrapped in a Promise
      api.getBookingDetailsApi.mockResolvedValue({
        movie:'swadesh',
        slot:'10 AM',
        seats:{
            A1:0,A2:2,A3:5,A4:0,D1:0,D2:4
        }
      });
      // Render the component
      render(<BookShow />);
      // See if the movie name we returned in the mock is visible
      await waitFor(() => {
        screen.getByText('Movie: swadesh');
      });
    });

    it("should render error message when api fails", async () => {
        api.getBookingDetailsApi.mockRejectedValue({});
        render(<BookShow/>);
        await waitFor(() => {
          screen.getByText("'No Previous Bookings found!!'");
        });
      });
  });