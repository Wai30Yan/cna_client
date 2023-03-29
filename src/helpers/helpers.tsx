export function GetDate(dateStr: string): string {
    const date = new Date(dateStr);
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

    return formattedDate;
}

export function GetTime(dateStr: string): string {
    const date = new Date(dateStr);
    const formattedTime = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

    return formattedTime;
}

export function BackendDateFormat(dateStr: string): string {
    return new Date(dateStr).toLocaleString();
}
