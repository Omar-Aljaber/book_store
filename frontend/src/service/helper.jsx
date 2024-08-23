/*************** HELPER ***************/

class Helper {    
    
    setHyphenBetweenWords(name){
        const originalName = name.replace(/ /g, "-");
        return originalName;
    };

    removeHyphenFormNames(name){
        const originalName = name.replace(/-/g, " ");
        return originalName;
    };
}

export default new Helper();