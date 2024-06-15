import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Button,
  Input,
  useDisclosure,
  Select,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { logoutReducer } from "../../redux/loginSlice";
import { ChakraDatePicker } from "../../components";
import { useForm, Controller } from "react-hook-form";
import { salesReducer } from "../../redux/salesSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";

const btns = [
  {
    icon: faEdit,
    identifier: "edit",
  },
  {
    icon: faEye,
    identifier: "view",
  },
  {
    icon: faTrash,
    identifier: "delete",
  },
];

const Addsales = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [currentData, setCurrentData] = useState(null);

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

    const salesdata = useSelector((state) => state?.sales?.salesData);
    console.log("salesdata===>",salesdata);

 

  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { control, handleSubmit, register, reset, formState: { errors } } = useForm();

  const logout = () => {
    dispatch(logoutReducer());
  };

  const actionHandler = (obj, data) => {
    console.log("data===>",data);
    if (obj.identifier === "edit") {
      setIsEdit(true);
      setCurrentData(data);
      onOpen();
    } if (obj.identifier === "view") {
      alert("view");
    } if (obj.identifier === "delete") {
      const updatedSales = salesdata?.filter((sale) => sale.customerId !== data.customerId);
      console.log("updateSales===>",updatedSales);
      dispatch(salesReducer({ salesData: updatedSales }));
    }
    
  };

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      date: data.date.toISOString(),
    };

    let updatedSales;
    if (isEdit) {
      updatedSales = salesdata?.map((sale) =>
        sale.customerId === formattedData.customerId ? formattedData : sale
      );
   
    } else {
      updatedSales = Array.isArray(salesdata) ? [...salesdata, formattedData] : [];  
    }
    dispatch(salesReducer({ salesData: updatedSales }));
    reset();
    setIsEdit(false);
    onClose();
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", margin: "20px" }}>
        <div style={{ display: "flex", gap: "20px" }}>
          <Box as="button" fontSize={20} borderRadius="md" bg="red" color="white" px={5} h={10}>
            Active Sales
          </Box>
          <Box as="button" fontSize={20} borderRadius="md" bg="green" color="white" px={5} h={10}>
            Completed Sales
          </Box>
        </div>
        <div style={{ display: "flex", gap: "20px" }}>
          <Box as="button" fontSize={20} borderRadius="md" bg="lightpink" color="white" px={5} h={10} onClick={onOpen}>
            + Sale Order
          </Box>
          <Box as="button" fontSize={20} borderRadius="md" bg="red" color="white" px={5} h={10} onClick={logout}>
            Logout
          </Box>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <TableContainer style={{ border: "4px solid", width: "80%", height: "70vh" }}>
          <Table variant="simple">
            <TableCaption style={{ fontSize: "20px" }}>Sales Data</TableCaption>
            <Thead>
              <Tr>
                <Th style={{ fontSize: "20px" }}>ID</Th>
                <Th style={{ fontSize: "20px" }}>Customer Name</Th>
                <Th style={{ fontSize: "20px" }}>Price</Th>
                <Th style={{ fontSize: "20px" }}>Paid</Th>
                <Th style={{ fontSize: "20px" }}>Last Modified</Th>
                <Th style={{ fontSize: "20px" }}>Actions</Th>
              </Tr>
            </Thead>
           <Tbody>

          {
              Array.isArray(salesdata) &&
              salesdata?.map((sale, index) => (
                <Tr key={index} style={{ fontSize: "20px", textAlign: "center" }}>
                  <Td>{sale.customerId}</Td>
                  <Td>{sale.customerName}</Td>
                  <Td>{sale.price}</Td>
                  <Td>{sale.paid}</Td>
                  <Td>{new Date(sale.date).toLocaleDateString()}</Td>
                  <Td style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "30px", fontSize: "20px" }}>
                    {btns.map((info) => (
                      <Box
                        key={info.identifier}
                        onClick={() => actionHandler(info, sale)}
                        style={{
                          borderRadius: "50%",
                          textAlign: "center",
                          border: "4px solid",
                          width: "45px",
                          height: "45px",
                          backgroundColor: "crimson",
                          color: "white",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        <FontAwesomeIcon icon={info.icon} />
                      </Box>
                    ))}
                  </Td>
                </Tr>
              ))}
            </Tbody> 
          
          </Table>
        </TableContainer>
      </div>

      <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isEdit ? "Edit Sales Order" : "Add Sales Order"}</ModalHeader>
          <ModalCloseButton onClick={() => { setIsEdit(false); onClose(); }} />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <FormLabel>Customer Id</FormLabel>
                <Input
                  placeholder="Customer Id"
                  defaultValue={isEdit ? currentData?.customerId : ""}
                  {...register("customerId", { required: "Customer Id is required" })}
                />
                {errors?.customerId && <p style={{ color: "red" }}>{errors.customerId?.message}</p>}
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Customer name</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Customer name"
                  defaultValue={isEdit ? currentData?.customerName : ""}
                  {...register("customerName", { required: "Customer name is required" })}
                />
                {errors?.customerName && <p style={{ color: "red" }}>{errors?.customerName?.message}</p>}
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Price</FormLabel>
                <Input
                  placeholder="Price"
                  defaultValue={isEdit ? currentData?.price : ""}
                  {...register("price", {
                    required: "Price is required",
                    min: { value: 0, message: "Price must be at least 0" },
                  })}
                />
                {errors?.price && <p style={{ color: "red" }}>{errors?.price?.message}</p>}
              </FormControl>

              <FormControl mt={4} isInvalid={errors?.paid}>
                <FormLabel>Paid</FormLabel>
                <Select
                  placeholder="Select option"
                  defaultValue={isEdit ? currentData?.paid : ""}
                  {...register("paid", { required: "Paid is required" })}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </Select>
                {errors?.paid && <p style={{ color: "red" }}>{errors?.paid?.message}</p>}
              </FormControl>

              <FormControl mt={4}>
                <FormLabel htmlFor="date">Date</FormLabel>
                <Controller
                  control={control}
                  name="date"
                  rules={{ required: "Date is required" }}
                  render={({ field }) => (
                    <ChakraDatePicker
                      selectedDate={field.value}
                      onChange={field.onChange}
                      defaultValue={isEdit ? new Date(currentData?.date) : new Date()}
                    />
                  )}
                />
                {errors?.date && <p style={{ color: "red" }}>{errors?.date?.message}</p>}
              </FormControl>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} type="submit">
                  {isEdit ? "Update" : "Save"}
                </Button>
                <Button onClick={() => { setIsEdit(false); onClose(); }}>Cancel</Button> {/* Close modal in edit mode */}
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
);
};

export default Addsales;



