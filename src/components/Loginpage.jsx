import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import {useForm} from "react-hook-form";
import { useToast } from '@chakra-ui/react';
import { useDispatch,useSelector } from 'react-redux';
import { Login } from '../redux/action';
import { useNavigate } from 'react-router';

  
  export default function LoginPage() {
    const { register, handleSubmit, reset } = useForm();
    const toast = useToast();
    const Alldata = useSelector(store => store.Alldata)
    const dispatch = useDispatch();
    const isError = useSelector(store => store.Alldata.loginError);
    const isSuccess = useSelector(store => store.Alldata.loginSuccess);
    const navigate = useNavigate();
    const logindata = useSelector(store => store.Alldata.login)

    const onSubmit =(data)=>{
         dispatch(Login(data));
         reset()
       
    }

    useEffect(()=>{
        if(isError || isSuccess) {
            showToast(Alldata)
            setTimeout(() => {
                if(logindata.type == "customer"){
                    navigate("/customer",{replace : true})
                }else if(logindata.type == "serviceProvider"){
                    navigate("/serviceProvider",{replace : true})
                }
              }, 2000)
        }
        
    },[isError,isSuccess])


    const showToast = (Alldata) => {
        toast({
          title: isError ? Alldata.error.name : 'Login',
          description: isError ? Alldata.error.response.data.error : "Login Successfull.",
          status: isError ? 'error' : "success",
          duration: 3000,
          isClosable: true,
        })
      }
       
      console.log(logindata);
      console.log(Alldata,"lll")
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" {...register("email")}/>
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" {...register("password")}/>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Button
                  type='submit'
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign in
                </Button>
              </Stack>
            </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    );
  }