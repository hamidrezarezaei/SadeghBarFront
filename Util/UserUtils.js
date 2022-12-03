import AsyncStorage from '@react-native-async-storage/async-storage';

// usage
// const context = useContext(UserContext);
// IsAdminCurrentUser(context)
// =================================================================
export const IsAdminCurrentUser = (context) => {
    try {
        let role = context.CurrentUser?.role;
        if (role == 'SuperAdmin' || role == 'Admin') {
            return true;
        }
        return false;
    } catch {
        return false;
    }
}
// =================================================================
export const IsSuperAdminCurrentUser = (context) => {
    try {
        let role = context.CurrentUser?.role;
        if (role == 'SuperAdmin') {
            return true;
        }
        return false;
    } catch {
        return false;
    }
}
// =================================================================
export const IsDriverCurrentUser = (context) => {
    try {
        let role = context.CurrentUser?.role;
        if (role == 'Driver') {
            return true;
        }
        return false;
    } catch {
        return false;
    }
}
// =================================================================
export const IsFreightageCurrentUser = (context) => {
    try {
        let role = context.CurrentUser?.role;
        if (role == 'Freightage') {
            return true;
        }
        return false;
    } catch {
        return false;
    }
}
// =================================================================
export const IsProductOwnerCurrentUser = (context) => {
    try {
        let role = context.CurrentUser?.role;
        if (role == 'ProductOwner') {
            return true;
        }
        return false;
    } catch {
        return false;
    }
}
// =================================================================
export const CurrentUserRole = (context) => {
    try {
        let role = context.CurrentUser?.role;
        return role;
    } catch {
        return false;
    }
}
// =================================================================
export const CurrentUserPersianRole = (context) => {
    try {
        let role = context.CurrentUser?.role;
        switch (role) {
            case "Driver":
                return "راننده";
            case "Freightage":
                return "باربری";
            case "Admin":
                return "ادمین";
            case "SuperAdmin":
                return "سوپر ادمین";
        }
    } catch {
        return "";
    }
}
// =================================================================
export const UserPersianRole = (role) => {
    try {
        switch (role) {
            case "Driver":
                return "راننده";
            case "Freightage":
                return "باربری";
            case "ProductOwner":
                return "صاحب کالا";
            case "Admin":
                return "ادمین";
            case "SuperAdmin":
                return "سوپر ادمین";
        }
    } catch {
        return "";
    }
}
// =================================================================
export const LogOutUser = async (context) => {
    await AsyncStorage.removeItem('token');
    context.CurrentUser = null;

}
// =================================================================

