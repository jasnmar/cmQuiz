const scoresSection = document.getElementById("scores");
const scoresDiv = document.createElement("div");
scoresDiv.setAttribute("id","scoreDiv");
scoresSection.appendChild(scoresDiv);

const scoreEntryList = document.createElement("ol");
scoreEntryList.setAttribute("id","scoreList");
scoresDiv.appendChild(scoreEntryList);

let storedScores = JSON.parse(localStorage.getItem("initials"));
for (ii=0;ii<storedScores.length;ii++) {
    const scoreEntry = document.createElement("li");
    scoreEntry.setAttribute("id","se"+ii);
    let user = JSON.stringify(storedScores[ii].user);
    user = user.slice(1,-1);
    scoreEntry.textContent = user
    + " : " + JSON.stringify(storedScores[ii].score);
    scoreEntryList.appendChild(scoreEntry);
    
    
}
