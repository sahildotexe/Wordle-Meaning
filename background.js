const element = document
  .getElementsByTagName("game-app")[0]
  .shadowRoot.getElementById("board");



const datas = [];
const count = 0;
async function getMeaning(word) {

    //Fetch meaning of words from api
            var url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

 
            const response = await fetch(url + word) ;
            const data = await response.json();
 
        
        if(data[0]){
            const meaning = data[0].meanings[0].definitions[0].definition;
            var dict = {};
            dict.word = word;
            dict.meaning = meaning;
        
            datas.push(dict);
        }


}

function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  }


element.addEventListener("mouseover", event => {



const selectedletter =  event.target.getAttribute("letters");
if(selectedletter){
    var selectedword = datas.filter(data => data.word === selectedletter);
    //Loader untill meaning is fetched
    getMeaning(selectedletter)

    if(selectedword.length > 0){
        var wordMeaning = selectedword[0].meaning;  
    }
    if(wordMeaning){
    if (document.contains(document.getElementById("mean"))) {
            document.getElementById("mean").remove();} 
    var header = document.createElement('h1');

    document.body.appendChild(header);
    header.setAttribute("id", "mean");
    header.setAttribute("class", "btm-left");
    // <p style="text-transform:capitalize;font-weight:bold" >${selectedword[0].word}  </p>
    header.innerHTML = `
       ${wordMeaning}
    `;
    header.style.position = "absolute";
    header.style.top = getOffset(event.target).top
    + "px";
    header.style.left = "62vw";
    header.style.zIndex = "1";
    header.style.backgroundColor = "white";
    header.style.padding = "10px";
    header.style.marginTop = "10px";
    header.style.borderRadius = "5px";
    header.style.border = "1px solid black";
    header.style.fontSize = "14px";
    header.style.color = "black";
    header.style.fontWeight = "normal";
    header.style.textAlign = "center";
    document.body.replaceChild(header,header);

    setTimeout(() => {
        header.remove();
    }, 3000);

} 

}


});


element.addEventListener("mouseout", event => {



    const selectedletter =  event.target.getAttribute("letters");
    if(selectedletter){
        var selectedword = datas.filter(data => data.word === selectedletter);
        //Loader untill meaning is fetched
        getMeaning(selectedletter)
    
        if(selectedword.length > 0){
            var wordMeaning = selectedword[0].meaning;  
        }
        if(wordMeaning){
        if (document.contains(document.getElementById("mean"))) {
                document.getElementById("mean").remove();} 
        var header = document.createElement('h1');
    
        document.body.appendChild(header);
        header.setAttribute("id", "mean");
        header.setAttribute("class", "btm-left");
        // <p style="text-transform:capitalize;font-weight:bold" >${selectedword[0].word}  </p>
        header.innerHTML = `
           ${wordMeaning}
        `;
        header.style.position = "absolute";
        header.style.top = getOffset(event.target).top
        + "px";
        header.style.left = "62vw";
        header.style.zIndex = "1";
        header.style.backgroundColor = "white";
        header.style.padding = "10px";
        header.style.marginTop = "10px";
        header.style.borderRadius = "5px";
        header.style.border = "1px solid black";
        header.style.fontSize = "14px";
        header.style.color = "black";
        header.style.fontWeight = "normal";
        header.style.textAlign = "center";
        document.body.replaceChild(header,header);
    
        setTimeout(() => {
            header.remove();
        }, 3000);
    
    } 
    
    }
    
    
    });
