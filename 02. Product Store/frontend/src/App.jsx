import { useState, useEffect } from 'react';
import { Box, Button, Heading, Text, VStack, Container } from '@chakra-ui/react';

function App() {
  const [backendStatus, setBackendStatus] = useState("Connecting...");

  useEffect(() => {
    // Fetch data from your Express backend
    fetch('http://localhost:3000/api/health')
      .then((res) => res.json())
      .then((data) => setBackendStatus(data.status))
  //    .catch((err) => setBackendStatus("Disconnected ❌"));
  }, []);

  return (
    <Container maxW="container.md" centerContent py={10}>
      <Box p={8} borderWidth={1} borderRadius="lg" boxShadow="md" width="full" textAlign="center">
        <VStack spacing={4}>
          <Heading as="h1" size="xl" color="teal.500">
            MERN Stack Dashboard
          </Heading>
          
          <Text fontSize="lg">
            Backend Server Status: <strong>{backendStatus}</strong>
          </Text>

          <Button colorScheme="teal" size="lg" onClick={() => alert('Chakra UI Works!')}>
            Click Me
          </Button>
        </VStack>
      </Box>
    </Container>
  );
}

export default App;
