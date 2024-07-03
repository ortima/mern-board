import { CustomAlert } from "../shared";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <CustomAlert />
      {children}
    </>
  );
};
