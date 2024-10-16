import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ms from "ms";

const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get("/api/users");
      return data;
    },
    staleTime: ms("5m"),
    retry: 3,
  });
};

export default useUsers;
