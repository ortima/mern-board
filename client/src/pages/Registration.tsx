import { useEffect, useState } from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import {
  GlobalStyles,
  CssBaseline,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Typography,
  Stack,
  Snackbar,
  SnackbarProps,
  LinearProgress,
  IconButton,
  IconButtonProps,
} from "@mui/joy";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../store/authSlice";
import { useAppDispatch } from "../store";
import {
  Email,
  Key,
  BadgeRounded,
  LightModeRounded,
  DarkModeRounded,
} from "@mui/icons-material";

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
  confirmPassword: HTMLInputElement;
  persistent: HTMLInputElement;
}
interface SignUpFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

function ColorSchemeToggle(props: IconButtonProps) {
  const { onClick, ...other } = props;
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <IconButton
      aria-label="toggle light/dark mode"
      size="sm"
      variant="outlined"
      disabled={!mounted}
      onClick={(event) => {
        setMode(mode === "light" ? "dark" : "light");
        onClick?.(event);
      }}
      {...other}
    >
      {mode === "light" ? <DarkModeRounded /> : <LightModeRounded />}
    </IconButton>
  );
}

export default function Registration() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [snackbarInfo, setSnackbarInfo] = useState<{
    message: string;
    color: SnackbarProps["color"];
  }>({
    message: "text",
    color: "neutral",
  });

  const [value, setValue] = useState("");
  const minLength = 6;

  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = async (event: React.FormEvent<SignUpFormElement>) => {
    event.preventDefault();
    const formElements = event.currentTarget.elements;
    const data = {
      name: formElements.name.value,
      email: formElements.email.value,
      password: formElements.password.value,
      confirmPassword: formElements.confirmPassword.value,
      persistent: formElements.persistent.checked,
    };

    if (data.password !== data.confirmPassword) {
      setPasswordError(true);
      setOpen(true);
      setSnackbarInfo({
        message: "Password fields dont match!",
        color: "warning",
      });
      return;
    } else {
      setPasswordError(false);
    }

    try {
      const response = await dispatch(
        registerUser({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      );

      if (response.payload.errors) {
        console.error(
          "Server returned validation errors:",
          response.payload.errors,
        );
        return;
      }

      setSnackbarInfo({
        message: "User registered successfully!",
        color: "success",
      });
      setOpen(true);

      setTimeout(() => {
        setOpen(false);
        navigate("/login");
      }, 2000);
    } catch (error) {
      setOpen(true);
      setSnackbarInfo({ message: "Incorrect data", color: "danger" });
    }
  };

  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ":root": {
            "--Form-maxWidth": "800px",
            "--Transition-duration": "0.4s",
          },
        }}
      />
      <Box
        sx={(theme) => ({
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          left: { xs: 0, md: "50vw" },
          transition:
            "background-image var(--Transition-duration), left var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          backgroundColor: "background.level1",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundImage:
              "url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)",
          },
        })}
      />
      <Box
        sx={(theme) => ({
          width: { xs: "100%", md: "50vw" },
          transition: "width var(--Transition-duration)",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255 255 255 / 0.2)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundColor: "rgba(19 19 24 / 0.4)",
          },
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100dvh",
            width: "100%",
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ gap: 2, display: "flex", alignItems: "center" }}>
              <IconButton variant="soft" color="primary" size="sm">
                <BadgeRounded />
              </IconButton>
              <Typography level="title-lg">FORTECH</Typography>
            </Box>
            <Snackbar
              autoHideDuration={2000}
              onClose={() => setOpen(false)}
              open={open}
              color={snackbarInfo.color}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              {snackbarInfo.message}
            </Snackbar>
            <ColorSchemeToggle />
          </Box>
          <Box
            component="main"
            sx={{
              my: "auto",
              py: 2,
              pb: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 400,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "sm",
              "& form": {
                display: "flex",
                flexDirection: "column",
                gap: 2,
              },
              [`& .MuiFormLabel-asterisk`]: {
                visibility: "hidden",
              },
            }}
          >
            <Typography textAlign={"center"} fontWeight={700} fontSize={"24px"}>
              Registration
            </Typography>

            <Stack gap={4} sx={{ mt: 2 }}>
              <form onSubmit={handleSubmit}>
                <FormControl required>
                  <FormLabel>Name</FormLabel>
                  <Input type="text" name="name" />
                </FormControl>
                <FormControl required>
                  <FormLabel>Email</FormLabel>
                  <Input type="text" name="email" startDecorator={<Email />} />
                </FormControl>
                <FormControl required error={passwordError}>
                  <FormLabel>Password</FormLabel>
                  <Stack
                    spacing={0.5}
                    sx={{
                      "--hue": Math.min(value.length * 10, 120),
                    }}
                  >
                    <Input
                      type="password"
                      name="password"
                      placeholder="Type in here…"
                      startDecorator={<Key />}
                      value={value}
                      onChange={(event) =>
                        setValue(event.currentTarget.value || "")
                      }
                    />
                    <LinearProgress
                      determinate
                      size="sm"
                      value={Math.min((value.length * 100) / minLength, 100)}
                      sx={{
                        bgcolor: "background.level3",
                        color: "hsl(var(--hue) 80% 40%)",
                      }}
                    />
                    <Typography
                      level="body-xs"
                      sx={{
                        alignSelf: "flex-end",
                        color: "hsl(var(--hue) 80% 30%)",
                      }}
                    >
                      {value.length < 3 && "Very weak"}
                      {value.length >= 3 && value.length < 6 && "Weak"}
                      {value.length >= 6 && value.length < 10 && "Strong"}
                      {value.length >= 10 && "Very strong"}
                    </Typography>
                  </Stack>
                </FormControl>
                <FormControl required error={passwordError}>
                  <FormLabel>Confirm password</FormLabel>
                  <Input
                    startDecorator={<Key />}
                    type="password"
                    name="confirmPassword"
                  />
                </FormControl>
                <Stack gap={4} sx={{ mt: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox size="sm" label="Remember me" name="persistent" />
                    <Link to="/login">Have an account?</Link>
                  </Box>
                  <Button type="submit" fullWidth>
                    Sign up
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" textAlign="center">
              © ortima {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
