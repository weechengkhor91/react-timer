'use client'
import {Container, Flex, Heading, SimpleGrid, GridItem,Button,  Box, Divider, Stack} from "@chakra-ui/react";


import useTimer from "./hooks/useTimer";
import BoxWrapper from "./components/BoxWrapper";



const Home = () => {

  const { timeLeft, isStart, timerType, startTimer, stopTimer, resetTimer, counterCycle } = useTimer();

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  let timerTypeCapitalize = timerType.replace(/^./, timerType[0].toUpperCase());




  return (
    <>

    <header>
      <Box boxShadow="2px 3px 30px 0px rgb(0 0 0 / 10%)">
        <Container maxWidth="container.xl" padding={0}>
          <Flex  py={[2, 4, 4]} alignItems="center" justifyContent="center" >
              <SimpleGrid columns={12} columnGap={8} rowGap={2} w="full">
                  <GridItem colSpan={[12,12]} >
                    <Heading  variant="headingCustom" textAlign="center">Pomodoro Timer</Heading>
                  </GridItem>
              </SimpleGrid>
          </Flex>
        </Container>
      </Box>
      <Box h={{base: '25px', md:'30px'}}></Box>
    </header>

    <main>
        
        <Container maxWidth="container.sm">
            <BoxWrapper>

                  {/* Timer Display Start */}
                  <Flex justifyContent="center" direction="column" textAlign="center" p={6}>
                      <Heading variant="headingCustom" fontWeight="500" >{`${timerTypeCapitalize} Time`}</Heading>
                      <Heading fontSize={{base: '80px', md:'120px'}}>{formatTime(timeLeft)}</Heading>
                  </Flex>
                  {/* Timer Display Start */}

                  <Divider w='full' borderColor="#fff"/>

               
                  <Box h={{base: '15px', md:'30px'}}></Box>

                    {/* Timer Button Start */}
                    <Flex justifyContent="center" direction="column" textAlign="center">
                      {
                        !isStart ? (
                          <Stack direction="row" justifyContent="center" spacing={8}>
                              <Button variant="buttonCustom"  onClick={startTimer}>Start</Button>
                              <Button variant="buttonCustomOutline" onClick={resetTimer}>Reset</Button>
                          </Stack>
                          
                        ) : (
                          <Stack direction="row" justifyContent="center" spacing={8}>
                            <Button variant="buttonCustomOutline"  onClick={stopTimer}>Pause</Button>
                          </Stack>
                        )
                      }
                      
                    </Flex>
                    {/* Timer Button End */}

                    <Box h={{base: '15px', md:'30px'}}></Box>

                    <Box>
                      <Heading variant="headingCustom" fontWeight={400} fontSize="16px">Cycle: {counterCycle}</Heading>
                    </Box>
                    <Box h={{base: '15px', md:'30px'}}></Box>
            </BoxWrapper> 
        </Container>
    </main>
    </>
  )
}

export default Home;

