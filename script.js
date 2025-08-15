var missions = []
function gateMissionsFromStorage(){
    let retrivedMissions = JSON.parse(localStorage.getItem("MyMissions"))
    missions = retrivedMissions ?? []
    //قيمة وكود مختصر اكثر ويعطي نفس الفاعلية, الفكرة منه أن اشارتي الاستفهام ترمز لكون القيمة فارغة
    //if (retrivedMissions == null){
    //    missions = []
    //}else {
    //    missions = retrivedMissions
    //}
}
gateMissionsFromStorage()
var index = 0
function addMission (){
    document.getElementById("content").innerHTML = ""
    var index = 0
    for (i of missions){
        var content = 
        `<div class="mission ${i.isDone ? 'done' : ''}">
            <div class="mission-name">
                <h3>${i.name}</h3>
                <div class="mission-date">
                    <i class="fa-regular fa-calendar-days"></i>
                    <p class="datetime">${i.date}</p>
                </div>
            </div>
            <div class="mission-statu">
                <i class="fa-solid fa-trash" onclick= "deleteMission(${index})"></i>
                ${i.isDone ? `
                    <i class="fa-solid fa-xmark" onclick= "toggleMissionCollection (${index})"></i>
                    ` : `
                    <i class="fa-solid fa-check" onclick= "toggleMissionCollection (${index})"></i>
                `}
                <i class="fa-solid fa-pen" onclick= "resetName(${index})"></i>
            </div>
        </div>`
        document.getElementById("content").innerHTML += content
        index++
    }    
}
var now = new Date()
var date = now.getDate() + "/" + (now.getMonth()+1) + "/" + now.getFullYear() + " - " + now.getHours() + ":" + now.getMinutes()
addMission()
document.getElementById("add-mission").addEventListener("click", function(){
    var newMissionName = prompt("يرجى إدخال اسم المهمة..." , "")
    var task = {
        "name": newMissionName,
        "date": date,
        "isDone": false
    }
    if (newMissionName !== null && newMissionName.trim() !== ""){
        missions.push(task)
    }else {
        console.error("FAILED TO LOAD THE MISSION NAME")
    }
    storeTasks ()
    addMission()
})
function deleteMission (index){
    var deleteAsk = confirm("هل تريد حذف المهمة " + missions[index].name + "؟")
    if (deleteAsk == true){
        console.log("mission deleted")
        missions.splice(index, 1)
        addMission ()
    }else {
        console.error("failed to delete the mission".toUpperCase())
    }
    storeTasks ()
}
function resetName (index){
    var taskName = missions[index].name
    var reset = prompt("يرجى إدخال اسم المهمة الجديد..." , taskName)
    if (reset !== null && reset.trim() !== ""){
        missions[index].name = reset
        addMission ()
    }else {
        console.error("FAILED TO RESET NAME")
    }
    storeTasks ()
}
function toggleMissionCollection (index){
    mission = missions[index]
    mission.isDone = !mission.isDone
    //كود أنظف ومختصر أكثر, الفكرة منه أن الكود يساوي عكسه, أي إذا كان صحيحا أصبح الجواب خطأ, وإن كان خاطئا أصبح الجواب صح
    //if (!missions[index].isDone){
    //    missions[index].isDone  = true
    //}else {
    //    missions[index].isDone  = false
    //}
    storeTasks ()
    addMission ()
}
function storeTasks (){
    var missionsAtString = JSON.stringify(missions)
    localStorage.setItem("MyMissions" , missionsAtString)
}