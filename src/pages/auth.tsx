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
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Auth() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))
        console.log(formData)
    }

    function handleClcik() {
        if (formData.email === 'channyeinaung@gmail.com' && formData.password === 'abcd') {
            router.push('/')
        }
    }
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack width='350px' spacing={4} height='400px'>
                        <Heading fontSize={'4xl'}>Sign in as Admin</Heading>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input value={formData.email} onChange={handleChange} name='email' type="email" />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input value={formData.password} onChange={handleChange} name='password' type="password" />
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
                                onClick={handleClcik}
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Sign in
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}