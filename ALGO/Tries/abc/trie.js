class TN {
    constructor() {
        this.children = new Array(26).fill(null);
        this.AC_word_idx = [];
        this.isEnd = false;
    }
}

function insert(root, s) {
    //console.log(s);
    let temp = root;
    for (let i = 0; i < s.length; i++) {
        let idx = s.charCodeAt(i) - 'a'.charCodeAt(0);
        if (!temp.children[idx]) temp.children[idx] = new TN();
        temp = temp.children[idx];
        temp.AC_word_idx.push(s);
    }
    temp.isEnd = true;
}

function search(root, s) {
    let temp = root;
    for (let i = 0; i < s.length; i++) {
        let idx = s.charCodeAt(i) - 'a'.charCodeAt(0);
        if (!temp.children[idx]) return ["Not found"];
        temp = temp.children[idx];
    }
    return temp.AC_word_idx;
}
//global
let root = new TN();
let words;
function initialise()
{
    words = ["saurabh","sunny","suryansh","aparana","aporva","shivam","shivani","shivansh","tanish","jagdish","sauurabhp",
    "sakshi","prince","abhishek","rachit","prakhar","prakash","paras","avantika","sarthak","rahul","sanchit",
    "saurya", "ravi", "ravikishan", "rahul", "lavnesh","mehul","ankit","avinash","kunal","mayank","samyak","ankita","siya","rajni","rajnish"
    ,"pranjal","nancy","satyam","astha","pragati","anim","aayush","adarsh","aman","amit","aryan","deepak","kartik","kartikey"];
    for (let x of words) insert(root, x);  
}
initialise();
function insert_new()
{
    let val=document.getElementById("in").value; 

    if(val===""){document.getElementById("mess").innerHTML="empty value";}
    else{
    insert(root,val);
    document.getElementById("mess").innerHTML="name inserted";
    }
    saveData();
    document.getElementById("in").value="";
    setTimeout(()=>{
        document.getElementById("mess").innerHTML="";
    },3000);
}
function main() {
    let qur = document.getElementById("search").value;
    let search_box=document.getElementById("search_id");
    while (search_box.firstChild) {
        search_box.removeChild(search_box.firstChild);
     } 
    let ans = [];
    
    ans.push(search(root,qur));
    for (let i = 0; i < ans.length; i++) {
        for (let str of ans[i]){
            let temp=document.createElement('div');
            temp.innerText=str;
            search_box.appendChild(temp);
            //console.log(str + " ");
        }
       // console.log("");
    }
    
}
 
//storing locally
function saveData() {
    localStorage.setItem("rootData", JSON.stringify(root));
}