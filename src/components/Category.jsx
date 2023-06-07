import { useState } from "react";
import { Drawer,DrawerOverlay,DrawerContent,DrawerHeader,DrawerBody,RadioGroup,Radio,Stack } from "@chakra-ui/react";




export default function Category  ({openDrawer,setOpenDrawer,handlevalues})  {
    const [value, setValue] = useState("Car");

    const handlevalue =(e) =>{
        setValue(e);
        setOpenDrawer(false)
        handlevalues(e)
    }

    const closeDrawer = () => {
        setOpenDrawer(false)
    }
    
    return(
      <>
       <Drawer  placement={"top"} onClose={closeDrawer} isOpen={openDrawer}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth='1px' color={"#0B86C2"}>Select Category</DrawerHeader>
            <DrawerBody>
              <RadioGroup onChange={handlevalue} value={value} ml={6}>
                <Stack direction='row' p={"4px"}>
                  <Radio value='Car'>Car</Radio>
                  <Radio value='Ricksaw'>Ricksaw</Radio>
                  <Radio value='Tempo'>Tempo</Radio>
                  <Radio value='Truck'>Truck</Radio>
                </Stack>
              </RadioGroup>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    )
  }

