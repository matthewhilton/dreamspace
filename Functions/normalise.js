export default function Normalize(array){ 
    const maxValue = array.reduce((acc, next) => Math.max(acc, next), initialValue=1);
    array = array.map((val) => val/maxValue)
    return array;
}