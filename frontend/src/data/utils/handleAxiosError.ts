import { AxiosError } from "axios";

interface ErrorResponse {
  message?: string;
}

export const handleAxiosError = (
  error: unknown,
  defaultMessage: string
): string => {
  const axiosError = error as AxiosError<ErrorResponse>;
  return axiosError.response?.data?.message || defaultMessage;
};
