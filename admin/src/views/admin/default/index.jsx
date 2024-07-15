// Chakra imports
import {
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import axios from 'axios';

import ComplexTable from "./components/ComplexTable";
import Marketplace from "../marketplace";

export default function UserReports() {
  const [tableDataComplex, setTableDataComplex] = useState([]);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchFlightData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/flights`);
        setTableDataComplex(response.data);
      } catch (error) {
        console.error('Error fetching flight data:', error);
      }
    };

    fetchFlightData();
  }, [BACKEND_URL]);

  const columnsDataComplex = useMemo(() => [
    {
      Header: "Departure City",
      accessor: "departureCity",
    },
    {
      Header: "Destination City",
      accessor: "destinationCity",
    },
    {
      Header: "Departure Date",
      accessor: "departureDate",
    },
    {
      Header: "Return Date",
      accessor: "returnDate",
    },
    {
      Header: "Traveler/Class",
      accessor: "classSelection",
    },
    {
      Header: "Action",
      accessor: "_id",
    },
  ], []);

  const handleDelete = async (flightId) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/flights/${flightId}`);
      // Update the flights data after deletion
      setTableDataComplex(prevData => prevData.filter(flight => flight._id !== flightId));
    } catch (error) {
      console.error("Error deleting flight:", error);
    }
  };

  return (
    <>
      <Box pt={{ base: "130px", md: "80px", xl: "100px" }}>
        <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px'>
          <ComplexTable
            columnsData={columnsDataComplex}
            tableData={tableDataComplex} // Pass tableData as a prop
            handleDelete={handleDelete} // Pass the handleDelete function to ComplexTable
          />
        </SimpleGrid>
      </Box>
      <Marketplace />
    </>
  );
}
