const element = document
  .getElementsByTagName("game-app")[0]
  .shadowRoot.getElementById("board");



const datas = [];
const count = 0;
getMeaning()
async function getMeaning() {
    var rows = element.querySelectorAll("[length]");
    var wordsarr = [];
    var words = rows.forEach(row => {
        var word = row.getAttribute("letters"); 
        if(word){
            wordsarr.push(word);
        }
    });
    //Fetch meaning of words from api
var url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
    wordsarr.forEach( async word => {
    const response = await fetch(url + word);
    const data = await response.json();
    const meaning = data[0].meanings[0].definitions[0].definition;
    var dict = {};
    dict.word = word;
    dict.meaning = meaning;

    datas.push(dict);
    });
}



element.addEventListener("click", event => {
getMeaning()
const selectedletter =  event.target.getAttribute("letters");
if(selectedletter){
    var selectedword = datas.filter(data => data.word === selectedletter);
    if(selectedword.length > 0){
        var wordMeaning = selectedword[0].meaning;  
    }
    if(wordMeaning){
    var header = document.createElement('h1');
    document.body.appendChild(header);
    header.setAttribute("id", "word-meaning");
    header.innerHTML = wordMeaning;
    header.style.position = "absolute";
    header.style.top = event.clientY + "px";
    header.style.left = event.clientX + "px";
    header.style.zIndex = "1";
    header.style.backgroundColor = "white";
    header.style.padding = "10px";
    header.style.borderRadius = "5px";
    header.style.border = "1px solid black";
    header.style.fontSize = "20px";
    header.style.color = "black";
    header.style.fontWeight = "bold";
    header.style.textAlign = "center";
    document.body.replaceChild(header,header);

    setTimeout(() => {
        header.remove();
    }, 3000);

}
}


});

