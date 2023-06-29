let counter = 0;
export function generateUniqueId(type){
    return `${type}-${counter ++}`
}
