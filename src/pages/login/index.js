import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { loginReducer } from "../../redux/loginSlice";
import { toast } from "react-toastify";
import { Toast_Message } from "../../components";

export default function Login() {
  const dispatch = useDispatch();

  const getUser = useSelector((state) => state?.loginReducer);
  console.log("loggeduser=====>", getUser);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    console.log("values====>", values);
 
          let email = "isha@gmail.com";
          let password = "123456";

          if(email === values.email && password === values.password){
            toast.success(Toast_Message.LOGIN_SUCCESSFULLY);
            dispatch(loginReducer({ ...values, isLoggedin: true }));
          }
           else{
            toast.error(Toast_Message.NOT_VALID_USER);
           }
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('/images/login-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: "50%",
          height: "50vh",
          borderRadius: "15px",
          display: "flex",
          justifyContent: "start",
        }}
      >
         <div
          style={{
            width: "50%",
            height: "50vh",
            borderTopLeftRadius:"15px",
            borderBottomLeftRadius:"15px",
            backgroundImage: "url('/images/box.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            display:"flex",
            justifyContent:"center",
            paddingTop:"60px"
          }}
        >  <h1 style={{fontSize:"40px",fontWeight:"bolder"}}>Welcome User</h1></div>
        <div
          style={{
            width: "50%",
            height: "50vh",
            borderTopRightRadius:"15px",
            borderBottomRightRadius:"15px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            justifyContent: "center",
            backgroundColor:"#f2f2f234"
          }}
        >
          <FormControl isInvalid={errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              placeholder="email"
              {...register("email", {
                required: "This is required",
                minLength: { value: 4, message: "Minimum length should be 4" },
              })}
              style={{ height: "60px" }}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.password}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              placeholder="password"
              {...register("password", {
                required: "This is required",
                minLength: { value: 4, message: "Minimum length should be 4" },
              })}
              style={{ height: "60px" }}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </div>
       
      </form>
    </div>
  );
}
