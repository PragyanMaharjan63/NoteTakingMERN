import axios from "axios";

import { useBackendURL } from "../contexts/context";
export default function Account() {
  let backendURL = useBackendURL();

  const getAccount = async () => {
    let req = await axios.post(
      `${backendURL}api/auth/signin`,
      {
        UserName: "pragyanFrontend",
        Email: "pragyanh@gmail.com",
        Password: "thisisafish",
      },
      { withCredentials: true }
    );
    console.log(req);
  };
  return (
    <>
      <button onClick={getAccount}>Create</button>
    </>
  );
}
