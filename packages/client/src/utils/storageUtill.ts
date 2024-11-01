export function getSessionStorage(name: string) {
    try {
        return sessionStorage.getItem(name);
    } catch (error) {
        console.log(error);
    }
}

export function setSessionStorage(name: string, value: string) {
    try {
        sessionStorage.setItem(name, value);
    } catch (error) {
        console.log(error);
    }
}
