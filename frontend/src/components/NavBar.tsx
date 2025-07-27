import React from 'react';
import { Box, Flex, HStack, Heading, Link as ChakraLink } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => (
  <Box bg="brand.500" color="white" px={4} py={2} mb={6}>
    <Flex align="center" maxW="1200px" mx="auto">
      <Heading size="md" mr={8}>
        Healthcare SaaS
      </Heading>
      <HStack spacing={4}>
        <ChakraLink as={Link} to="/incidents">Incidents</ChakraLink>
        <ChakraLink as={Link} to="/risks">Risks</ChakraLink>
        <ChakraLink as={Link} to="/audits">Audits</ChakraLink>
      </HStack>
    </Flex>
  </Box>
);

export default NavBar;
