function extractThemeRoot(htmlString){
    const rootStart = htmlString.indexOf(':root');
    const openBrace = htmlString.indexOf('{', rootStart);
    const closeBrace = htmlString.indexOf('}', openBrace);
    const rootBlock = htmlString.substring(openBrace + 1, closeBrace).trim();
    const rootVars = {};
    rootBlock.split(';').forEach(line => {
    if (line.trim()) {
        const [key, value] = line.split(':').map(part => part.trim());
        rootVars[key] = value;
    }
    });

    console.log(rootVars);

}


