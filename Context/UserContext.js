import { createContext } from "react";
const UserContext = createContext({
    mobile: null,
    CurrentUser: null
});
export default UserContext;