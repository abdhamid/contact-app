import React from "react";
import {render, fireEvent } from '@testing-library/react-native'
import Card from "./Card";

describe('Card', () => {
    const mockValue = {
      firstName: 'John',
      lastName: 'Doe',
      age: 25,
    };
    const mockEditHandler = jest.fn();
    const mockDeleteHandler = jest.fn();

    it('should render card with correct values', () => {
        const { getByText } = render(
          <Card value={mockValue} onEdit={mockEditHandler} onDelete={mockDeleteHandler} />
        );
    
        expect(getByText(`${mockValue.firstName} ${mockValue.lastName}`)).toBeDefined();
        expect(getByText(`Age :${mockValue.age}`)).toBeDefined();
      });
    

})