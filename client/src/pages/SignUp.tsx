import {
  Avatar,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { LockOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { RootState, useAppDispatch } from "../store";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "../store/authSlice";
import { FormDataSignUp, formSchema } from "../schemas/formSchema";
import { signUpFields } from "../constants";
import { useSelector } from "react-redux";

const defaultTheme = createTheme();

export default function SignUp() {
  const dispatch = useAppDispatch();
  const isLoading = useSelector((state: RootState) => state.auth.loading);
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
      );
      navigate("/signin");
    } catch (error) {}
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
                        disabled={isLoading}
                      />
                    )}
                  />
                </Grid>
              ))}
            </Grid>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              loading={isLoading}
              disabled={isLoading}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </LoadingButton>
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
