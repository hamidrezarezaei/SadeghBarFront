export const persianStatus = (status) => {
    switch (status) {
        case 'TimeOut':
            return "بار را نمی برد";
        case 'Waiting':
            return "در حال انتظار";
        case 'WaitingByExtendTime':
            return "در حال انتظار";
        case 'Accepted':
            return "بار را می برد";
        case 'ExitFromQueue':
            return "خروج از صف";
        default:
            return status;
    }
}
// =================================================================