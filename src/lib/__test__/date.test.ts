import { dateFormat } from "../date";

describe("dateFormat", () => {
  it("should format a Date object to 'DD MMMM YYYY'", () => {
    const date = new Date(2023, 9, 5); // 5th October 2023
    const formattedDate = dateFormat(date);
    expect(formattedDate).toBe("05 October 2023");
  });

  it("should format a date string to 'DD MMMM YYYY'", () => {
    const date = "2023-10-05";
    const formattedDate = dateFormat(date);
    expect(formattedDate).toBe("05 October 2023");
  });

  it("should format a Date object to a custom format", () => {
    const date = new Date(2023, 9, 5); // 5th October 2023
    const format = "YYYY/MM/DD";
    const formattedDate = dateFormat(date, format);
    expect(formattedDate).toBe("2023/10/05");
  });

  it("should format a date string to a custom format", () => {
    const date = "2023-10-05";
    const format = "YYYY/MM/DD";
    const formattedDate = dateFormat(date, format);
    expect(formattedDate).toBe("2023/10/05");
  });

  it("should handle invalid date input gracefully", () => {
    const date = "invalid-date";
    const formattedDate = dateFormat(date);
    expect(formattedDate).toBe("Invalid Date");
  });
});
