import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ContactList from './ContactList';

describe('ContactList', () => {
  const contacts = [
    { firstName: 'John', lastName: 'Doe', age: 30 },
    { firstName: 'Jane', lastName: 'Doe', age: 25 },
    { firstName: 'Bob', lastName: 'Smith', age: 45 }
  ];

  const handleEdit = jest.fn()
  const handleDelete = jest.fn()
})