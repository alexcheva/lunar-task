import React from "react";
import { render, screen } from "@testing-library/react";
import * as td from "testdouble";

const Foo = () => <h1>Hello World!</h1>;

describe("Foo", () => {
  it("rendered successfully", () => {
    render(<Foo />);
    const text = screen.queryByText("Hello World!");
    expect(text).toBeInTheDocument();
    const testFunc = td.func();
  });
});
