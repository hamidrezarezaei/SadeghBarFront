// =================================================================
export const persianStatus = (status) => {
    switch (status) {
        case ("NewCargo"): return "در انتظار تایید";
        case ("Active"): return "فعال";
        case ("TakeByDriver"): return "حمل شده";
        // case ("TakeByDriver"): return "در حال حمل";
        case ("CancelByDriver"): return "کنسل شده توسط راننده";
        case ("CancelBySubmitter"): return "کنسل شده توسط اعلام کننده";
        case ("UpdatedBySubmitter"): return "ویرایش شده";
        case ("UpdatedByAdmin"): return "ویرایش شده توسط مدیر";
        case ("DeleteByAdmin"): return "حذف شده توسط مدیر";
    }
}
// =================================================================
export const StatusColor = (status) => {
    switch (status) {
        
        case ("NewCargo"): return "#ffedb5";
        case ("Active"): return "#ffffff";
        case ("TakeByDriver"): return "#cefad8";
        // case ("TakeByDriver"): return "در حال حمل";
        case ("CancelByDriver"): return "#ffb3b3";
        case ("CancelBySubmitter"): return "#f5b3b3";
        // case ("UpdatedBySubmitter"): return "ویرایش شده";
        // case ("UpdatedByAdmin"): return "ویرایش شده توسط مدیر";
        case ("DeleteByAdmin"): return "#f5b3b3";
    }
}