import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { z } from "zod";
import { useAppDispatch } from "../store";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { showAlert } from "../store/alertSlice";
import { registerUser } from "../store/authSlice";
import { FormDataSignUp, formSchema } from "../schemas/formSchema";
import { signUpFields } from "../constants";

const defaultTheme = createTheme();

export default function SignUp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormDataSignUp>({
    resolver: zodResolver(formSchema.signUp),
    defaultValues: {
      email: "",
      name: "",
      secondName: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = async (data: FormDataSignUp) => {
    try {
      await dispatch(
        registerUser({
          email: data.email,
          name: data.name,
          password: data.password,
        }),
      ).unwrap();

      dispatch(
        showAlert({
          message: "Success! You have signed up",
          open: true,
          severity: "success",
        }),
      );
      navigate("/signin");
    } catch (error: any) {
      dispatch(
        showAlert({
          message: error,
          open: true,
          severity: "error",
        }),
      );
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              {signUpFields.map(({ id, name, label, type }) => (
                <Grid
                  item
                  xs={12}
                  sm={id === "name" || id === "secondName" ? 6 : 12}
                  key={name}
                >
                  <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        required
                        fullWidth
                        id={id}
                        label={label}
                        type={type}
                        autoComplete={id}
                        error={!!errors[name]}
                        helperText={errors[name] ? errors[name]?.message : ""}
                      />
                    )}
                  />
                </Grid>
              ))}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/signin">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
