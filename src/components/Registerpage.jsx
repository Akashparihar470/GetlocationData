import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { useToast, Text, Select } from '@chakra-ui/react'
import { CgGhostCharacter } from "react-icons/cg";
import { BsCarFront } from "react-icons/bs"
import { Register } from '../redux/action';
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router';
import { Link as RouterLink } from "react-router-dom"


export default function Registerpage() {
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      type: 'customer'
    }
  });
  const Alldata = useSelector(store => store.Alldata)
  const dispatch = useDispatch();
  const toast = useToast();
  const isError = useSelector(store => store.Alldata.registerError);
  const isSuccess = useSelector(store => store.Alldata.registerSuccess);
  const [isServiceProvider, setIsServiceProvider] = useState(false)
  const navigate = useNavigate()


  const onSubmit = (data) => {
    dispatch(Register(data));
    reset()

  }


  useEffect(() => {
    if (isError || isSuccess) {
      showToast(Alldata)
      setTimeout(() => {
        navigate("/login", { replace: true })
      }, 2000)
    }

  }, [isError, isSuccess])

  const handlecheck = () => {
    if (isServiceProvider) {
      setIsServiceProvider(false);
      setValue("type", "customer")
    } else {
      setIsServiceProvider(true);
      setValue("type", "serviceProvider")

    }
  }



  const showToast = (Alldata) => {
    toast({
      title: isError ? Alldata.error.name : 'Account created.',
      description: isError ? Alldata.error.response.data.error : "We've created your account for you.",
      status: isError ? 'error' : "success",
      duration: 2000,
      isClosable: true,
    })
  }


  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Register as {isServiceProvider ? "ServiceProvider" : "Customer"}</Heading>
          <Stack direction='row' spacing={4}>
            <Button leftIcon={<CgGhostCharacter />} onClick={handlecheck} colorScheme='teal' variant={isServiceProvider ? 'outline' : 'solid'} >
              Customer
            </Button>
            <Button leftIcon={<BsCarFront />} onClick={handlecheck} colorScheme='teal' variant={isServiceProvider ? 'solid' : 'outline'}>
              ServiceProvider
            </Button>
          </Stack>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl id="name">
              <FormLabel>Fullname</FormLabel>
              <Input type="text" {...register("fullName")} />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" {...register("email")} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password"   {...register("password")} />
            </FormControl>
            <FormControl id="Number">
              <FormLabel>Mobile No.</FormLabel>
              <Input type="number"  {...register("number")} />
            </FormControl>
            {isServiceProvider ?
              <>
                <FormControl id="category" >
                  <FormLabel>Vehicle</FormLabel>
                  <Select placeholder='Select Vehicle' {...register("category")}>
                    <option value='Ricksaw'>Ricksaw</option>
                    <option value='Car'>Car</option>
                    <option value='Tempo'>Tempo</option>
                    <option value='Truck'>Truck</option>
                  </Select>
                </FormControl>
                <FormControl id="Vehicleno">
                  <FormLabel>Vehicle No.</FormLabel>
                  <Input type="text"   {...register("vehicleNo")} />
                </FormControl> </> : null}
            <Stack spacing={6}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.500'}>Forgot password?</Link>
              </Stack>
              <Button type='submit' colorScheme={'blue'} variant={'solid'}>
                Sign in
              </Button>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <RouterLink style={{ color: "blue" }} to="/login">Login</RouterLink>
                </Text>
              </Stack>
            </Stack>
          </form>

        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://www.telekom.com/resource/image/417756/landscape_ratio4x3/1296/972/b12f3ee21d297374c1fb7793c9c4b132/0FB99A112D7197D8F7FC0D73E1880543/bi-schmuckbild-iot-kugeln-en.jpg'
          }
        />
      </Flex>
    </Stack>
  );
}






