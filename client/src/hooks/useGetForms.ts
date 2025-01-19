import useAuthenticatedAxios from "./useAuthenticatedAxios";
import { useQuery } from "@tanstack/react-query";

const useGetForms = (isEnabled: boolean) => {
  const axiosClient = useAuthenticatedAxios();

  const resposnse = useQuery({
    queryKey: ["forms"],
    queryFn: async () => {
      const forms = await axiosClient.post("/forms");
      return forms.data;
    },
    enabled: isEnabled,
  });

  return resposnse;
};

export default useGetForms;
