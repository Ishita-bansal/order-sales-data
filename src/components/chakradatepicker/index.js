import React from 'react';
import DatePicker from 'react-datepicker';
import { Input, Box } from "@chakra-ui/react";
import 'react-datepicker/dist/react-datepicker.css';

const ChakraDatePicker = ({ selectedDate, onChange }) => {
  return (
    <Box>
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        customInput={<Input />}
      />
    </Box>
  );
};

export default ChakraDatePicker;