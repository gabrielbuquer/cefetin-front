export function formatDate(date: string): string {
    const isoDate = new Date(date);
    const day = String(isoDate.getDate()).padStart(2, '0');
    const month = String(isoDate.getMonth() + 1).padStart(2, '0');
    const year = String(isoDate.getFullYear()).slice(-2);
    const hours = String(isoDate.getHours()).padStart(2, '0');
    const minutes = String(isoDate.getMinutes()).padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}