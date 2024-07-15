// Chakra imports
import {
  Box,
  SimpleGrid,

} from "@chakra-ui/react";
// Assets
import React from "react";

import ComplexTable from "./components/ComplexTable";
import {
  columnsDataComplex
} from "./variables/columnsData";
import tableDataComplex from "./variables/tableDataComplex.json";
import Marketplace from "../marketplace";

export default function UserReports() {
  // Chakra Color Mode

  return (
    <>
      <Box pt={{ base: "130px", md: "80px", xl: "100px" }}>

        <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px'>
          <ComplexTable
            columnsData={columnsDataComplex}
            tableData={tableDataComplex}
          />

        </SimpleGrid>
      </Box>
      <Marketplace />
    </>
  );
}
