
const table = document.getElementById("suduko");
let tables = Array.from({ length: 9 }, () => Array(9).fill(0));



function getRandomValue(range)
{
    return Math.floor(range * Math.random());
}

function createTable()
{
    table.style.borderSpacing ="0px"
    for(let i=0;i<9;i++)
    {
        let row = document.createElement('tr');
        for(let j=0;j<9;j++)
        {
            //creating new cell & input element
            let cell = document.createElement('td');
            let input = document.createElement('input'); 

            //indexing cell & input element
            let uniqueId = `${i}_${j}`;
            cell.setAttribute('id',uniqueId);

            //styling cell
            cell.style.border = "4px solid black";
            cell.style.padding = "0px";
            cell.style.fontSize="50px";

            //style input
            input.style.width ="100px";
            input.style.height ="100px";
            input.style.fontSize ="50px";
            input.style.textAlign ="center";
            //input.placeholder=i;
            input.style.backgroundColor="transparent";
            input.style.border = "none";

            //appending input textBox to each cell
            cell.appendChild(input);
            //appending cell to row tr
            row.appendChild(cell);
        }
        //appending row to table
        table.appendChild(row);
    }
} 

function updateTable()
{
    for(let i=0;i<9;i++)
    {
        for(let j=0;j<9;j++)
        {
            let data = document.getElementById(`${i}_${j}`).getElementsByTagName('input')[0].value;
            if(data==="")continue;
            tables[i][j] = data;
            console.log(data);
        }
    }
}

function checkValidity(i,j,n)
{
    let x=i,y=j;
    i=Math.floor(i/3) * 3,j=Math.floor(j/3) * 3;
    //console.log(i + " " + j);
    for(let row=i;row<i+3;row++)
    {
        for(let col=j;col<j+3;col++)
        { 
            if((i!=row || j!=col) && tables[row][col]==n)return 0;
        }
    }
    for(let row=0;row<9;row++)if(tables[row][y]==n)return 0;
    for(let col=0;col<9;col++)if(tables[x][col]==n)return 0;

    return 1;
}

function randomFillTable()
{ 
    for(let i=0;i<9;i++)
    {
        for(let j=0;j<9;j++)
        {
            if(Math.random() < 0.2)//Try to fill 1/3 rd cell of sudoko
            {
                let randVal = getRandomValue(9) ,count=0;
                while(count<7 && (!checkValidity(i,j,randVal)))
                {
                    randVal=(randVal+1)%9;
                    count++;
                }
                if(count<7)
                {
                    let uniqueId = `${i}_${j}`;
                    let fetchCell = document.getElementById(uniqueId).getElementsByTagName('input')[0];
                    fetchCell.value = randVal;
                    fetchCell.style.backgroundColor = "blue";//caf
                    //console.log(fetchCell.value);
                    tables[i][j]=randVal;
                }
            }
        }
    }
}

function clearTable()
{
    for(let i=0;i<9;i++)
    {
        for(let j=0;j<9;j++)
        {
            tables[i][j]=0;
            let uniqueId = `${i}_${j}`;
            let cell = document.getElementById(uniqueId).getElementsByTagName('input')[0];
            cell.value = "";
            cell.style.backgroundColor = "white";
        }
    }
}

function solveSuduko()
{
    for(let i=0;i<9;i++)
    {
        for(let j=0;j<9;j++)
        {
            if(tables[i][j]==0)
            {
                for(let k=1;k<=9;k++)
                {
                    if(checkValidity(i,j,k))
                    {
                        tables[i][j]=k;
                        let ui=`${i}_${j}`;
                        document.getElementById(ui).getElementsByTagName('input')[0].value = k;

                        if(solveSuduko())return true;

                        tables[i][j]=0;
                        document.getElementById(`${i}_${j}`).getElementsByTagName('input')[0].value = "";
                        //console.log(1);
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function solveSudoku() {
    function animateSolve(i, j) {
        if (i == 9) return Promise.resolve(true);

        if (tables[i][j] != 0) {
            return nextCell(i, j);
        }

        let ui = `${i}_${j}`;
        let cellInput = document.getElementById(ui).getElementsByTagName('input')[0];

        return new Promise(resolve => {
            function tryNext(k) {
                if (k > 9) {
                    tables[i][j] = 0;
                    cellInput.value = "";
                    cellInput.style.backgroundColor = "red";//caf
                    resolve(false);
                    return;
                }
                if (checkValidity(i, j, k)) {
                    tables[i][j] = k;
                    cellInput.value = k;
                    cellInput.style.backgroundColor = "green";
                    setTimeout(() => {
                        nextCell(i, j).then(result => {
                            if (result) {
                                resolve(true);
                            } else {
                                tables[i][j] = 0;
                                cellInput.value = "";
                                cellInput.style.backgroundColor = "red";//caf
                                setTimeout(() => tryNext(k + 1), 0.001);
                            }
                        });
                    }, 0.001);
                } else {
                    setTimeout(() => tryNext(k + 1), 0.001);
                }
            }

            tryNext(1);
        });
    }

    function nextCell(i, j) {
        if (j < 8) return animateSolve(i, j + 1);
        return animateSolve(i + 1, 0);
    }

    return animateSolve(0, 0);
}

function driverFun()
{
    createTable();  

    let randomFillBut = document.getElementById('randomFill');
    let clearTableBut = document.getElementById('clearBox');
    let solveBut = document.getElementById('solveBut');

    randomFillBut.addEventListener('click', randomFillTable);
    clearTableBut.addEventListener('click',clearTable);
    solveBut.addEventListener('click',() => {
        updateTable();
        if(solveSudoku())
        {
            console.log("solved");
        }
        else
        {
            console.log("not possible");
        }
    });
}
driverFun();