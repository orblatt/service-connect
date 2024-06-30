import React from 'react';
import { Flex, Icon, FlexProps } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';

interface NavItemProps extends FlexProps {
    icon: IconType;
    children: React.ReactNode;
    to: string;  // Added this to specify the route
}

const NavItem = ({ icon, children, to, ...rest }: NavItemProps) => {
    return (
        <ChakraLink as={ReactRouterLink} to={to} style={{ textDecoration: 'none' }}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'cyan.400',
                    color: 'white',
                }}
                {...rest}>
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </ChakraLink>
    );
}

export default NavItem;
