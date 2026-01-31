function euclideandist(a:number[],b:number[]){
    let sum=0;
    for (let i = 0; i < a.length; i++) {
        //@ts-ignore
        const diff= a[i]-b[i];
        sum+=diff*diff;

    }
    return Math.sqrt(sum)
}



export default euclideandist;