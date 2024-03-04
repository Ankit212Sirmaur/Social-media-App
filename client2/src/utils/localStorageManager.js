export const Key_Access_Token = 'access_token';

export  function getItem(key){
    return localStorage.getItem(key);
}

export function setItem(key, value){
    return localStorage.setItem(key, value);
}

export function removeItem(key){
    return localStorage.removeItem(key);
}