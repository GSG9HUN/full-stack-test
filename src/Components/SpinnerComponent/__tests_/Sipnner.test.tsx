import {render, screen} from "@testing-library/react";
import React from "react";
import Spinner from "../Spinner";

test('renders Spinner component', () => {
    render(<Spinner/>);
    const spinnerElement = screen.getByTestId('spinner');
    expect(spinnerElement).toBeInTheDocument();
})