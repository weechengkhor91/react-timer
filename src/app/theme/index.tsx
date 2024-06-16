

import { extendTheme, theme as base, withDefaultColorScheme, withDefaultVariant, border } from "@chakra-ui/react";


const buttonCustomStyles = {
    borderRadius: "full",
    px: 8,
    py: 4,
    fontSize: ["lg","lg","xl"],
    size:"lg",
    height:["80px", "80px", "100px"],
    width:["80px", "80px", "100px"],

}
const theme = extendTheme({
    colors: {
        brand: {
            50: '#FFF5F7',
            100: '#FED7E2',
            200: '#FBB6CE',
            300: '#F687B3',
            400: '#ED64A6',
            500: '#D53F8C',
            600: '#B83280',
            700: '#97266D',
            800: '#702459',
            900: '#521B41'
        }
    },
    fonts: {
        heading: `Poppins, ${base.fonts?.heading}`,
        body: `Inter, ${base.fonts?.body}`
    },
    components: {

        Heading: {
            variants: {
              headingCustom: {
                fontSize: {
                    base: 'lg', 
                    md:'2xl',
                },
                px:2,
                textAlign:"center"
              },
            },
          },
        Button: {
            variants: {

                buttonCustom: {
                    ...buttonCustomStyles,
                    bg:"brand.500",
                    color:"#fff",
                    _hover: {
                        bg: "brand.600",
                    },
                  },

                buttonCustomOutline: {
                    ...buttonCustomStyles,
                    bg:"brand.100",
                    color:"#000",
                    border:"1px",
                    borderColor:"brand.400",
                    _hover: {
                        bg: "brand.600",
                        color:"#fff",
                    },
                  },
                primary: {
                    ...buttonCustomStyles,
                    bg: "brand.500",
                    color: "#fff",
                    _hover: {
                        bg: "brand.600",
                    },
                },
            }
        },

    }
},


);

export default theme;
