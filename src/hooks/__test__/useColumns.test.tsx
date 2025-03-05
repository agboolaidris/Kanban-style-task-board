import { renderHook, act } from "@testing-library/react";
import { Provider } from "jotai";
import { useColumns } from "../useColumns";
import { CreateColumnBody } from "src/types/column";

describe("useColumns", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider>{children}</Provider>
  );

  it("should add a new column", () => {
    const { result } = renderHook(() => useColumns(), { wrapper });

    const newColumn: CreateColumnBody = { label: "New Column", color: "#090" };

    act(() => {
      result.current.addColumn(newColumn);
    });

    // Check if the new column is included in the columns array
    expect(result.current.columns).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          label: "New Column",
          color: "#090",
        }),
      ])
    );
  });

  it("should remove a column by id", () => {
    const { result } = renderHook(() => useColumns(), { wrapper });

    const columnToRemove: CreateColumnBody = {
      label: "To Do",
      color: "#007BFF",
    };

    act(() => {
      result.current.addColumn(columnToRemove);
    });

    const columnIdToRemove = result.current.columns[0].id;

    act(() => {
      result.current.removeColumn(columnIdToRemove);
    });

    // Check if the column has been removed
    expect(result.current.columns).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: columnIdToRemove,
        }),
      ])
    );
  });

  it("should update a column's label", () => {
    const { result } = renderHook(() => useColumns(), { wrapper });

    const newColumn: CreateColumnBody = { label: "To Do", color: "#007BFF" };

    act(() => {
      result.current.addColumn(newColumn);
    });

    const columnIdToUpdate = result.current.columns[0].id;

    const updatedData = { label: "Updated Column", color: "#007BFF" };

    act(() => {
      result.current.updateColumn(columnIdToUpdate, updatedData);
    });

    // Check if the updated column's label is included in the columns array
    expect(result.current.columns).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: columnIdToUpdate,
          label: "Updated Column",
        }),
      ])
    );
  });

  it("should move a column to a specific index", () => {
    const { result } = renderHook(() => useColumns(), { wrapper });

    const column1: CreateColumnBody = {
      label: "To Do 1",
      color: "#007BFF",
    };
    const column2: CreateColumnBody = {
      label: "To Do 2",
      color: "#007BFF",
    };

    act(() => {
      result.current.addColumn(column1);
      result.current.addColumn(column2);
    });

    const column1Id = result.current.columns[0].id;
    const column2Id = result.current.columns[1].id;

    // Move column1 to where column2 is (swap them)
    act(() => {
      result.current.moveColumn(column1Id, column2Id);
    });

    // Check if the order has changed, verifying that the new order contains the moved columns
    expect(result.current.columns[0].id).toBe(column2Id);
    expect(result.current.columns[1].id).toBe(column1Id);
  });
});
