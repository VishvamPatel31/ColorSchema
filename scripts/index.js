const slider = document.getElementById("theme")
const header = document.getElementById("header")
const body = document.getElementById("body")
const footer = document.getElementById("footer")
const getschemebtn = document.getElementById("getschemebtn")

slider.addEventListener("change", function(){
    header.classList.toggle("header")
    header.classList.toggle("headerdark")
    body.classList.toggle("bodydark")
    body.classList.toggle("body")
    footer.classList.toggle("footerdark")
    footer.classList.toggle("footer")
})

getschemebtn.addEventListener("click", function(){
    let rgb = document.getElementById("colourinput").value.toString().slice(1,7)
    console.log(rgb)
    let mode = document.getElementById("scheme").value.toLowerCase()
    console.log(mode)
    fetch(`https://www.thecolorapi.com/scheme?hex=${rgb}&mode=${mode}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }

    })
    .then(response=>response.json())
    .then(data=>{
        console.log(data.colors)
        rendercolors(data.colors)
    }
    )

})

function rendercolors(array){
    for (let i=0; i<6; i++){
        document.getElementById(`color${i+1}`).style.backgroundColor = `${array[i].hex.value}`
        document.getElementById(`hexcode${i+1}`).innerText = `${array[i].hex.value}`
    }
}

for( let j=1; j<6; j++){
    document.getElementById(`color${j}`).addEventListener("click", function(){
        let hexvalue = document.getElementById(`hexcode${j}`).innerText
        navigator.clipboard.writeText(hexvalue)
        .then(() =>  showNotification(`${hexvalue} copied to clipboard`))
        .catch(err => {
            console.error("Error copying text: ", err)
            showNotification("Failed to copy text")
        })
    })
}

function showNotification(message) {
    // Create the notification element
    const notification = document.createElement("div");
    notification.innerText = message;
    // Style the notification (inline styling for demo purposes)
    notification.style.position = "fixed";
    notification.style.bottom = "300px";
    notification.style.left = "50%";
    notification.style.transform = "translateX(-50%)";
    notification.style.backgroundColor = "#333";
    notification.style.color = "#fff";
    notification.style.padding = "10px 20px";
    notification.style.borderRadius = "5px";
    notification.style.boxShadow = "0 2px 10px rgba(0,0,0,0.3)";
    notification.style.zIndex = "1000";
    notification.style.opacity = "1";
    
    document.body.appendChild(notification);
    
    // After 2 seconds, fade out and remove the notification
    setTimeout(() => {
        notification.style.transition = "opacity 0.5s ease";
        notification.style.opacity = "0";
        
        // Remove element after fade-out completes
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 500);
    }, 1300);
}
