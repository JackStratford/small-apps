let source = {
    num: 10,
    str: "text",
    flag: true,
    arr: [1,2,3],
    date: new Date(2040,10,3),
    obj: {a: 9, b: "txt"} 

};

var result = deepCopy(source);

function deepCopy(obj) {
    var copy; 

    if(obj === null || typeof obj !== "object") 
    return obj;

    if(obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }
    if(obj instanceof Array) {
        copy = [];
        for (let i=0; i <obj.length; i++ ) {
            copy[i] = deepCopy(obj[i]);
        }
        return copy;

    }
        
    if(obj instanceof Object) {
        copy = {};
        for( key in obj) {
            console.log (key + " " + obj[key] );
            copy[key] = deepCopy( obj[key] );
        }

        return copy;
    }

};

console.log(result);