const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns=document.querySelectorAll(".dropdown  select ");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg")






for(let select of dropdowns)
{
    for(currCode in countryList)   
    {
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD")
        {
            newOption.selected="selected";
        }
        else if(select.name==="to" && currCode==="INR")
        {
            newOption.selected="selected";
        }
        select.append(newOption);
    

    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);

    });

    
    
}
const updateFlag=(element) =>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
};

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtValue=amount.value;
    if( !amtValue || amtValue < 1)
    {
        amtValue=1;
        amount.value="1";
    }
    const fromURL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    try {
        let response = await fetch(fromURL);
        let data = await response.json();
        
        if (!data[fromCurr.value.toLowerCase()]) {
            msg.innerText = "Error: Invalid currency data.";
            return;
        }

        let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
        
        if (!rate) {
            msg.innerText = "Error: Conversion rate not available.";
            return;
        }

        let finalAmt = (amtValue * rate).toFixed(2); // Fixed decimal places
        msg.innerText = `${amtValue} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
    } catch (error) {
        msg.innerText = "Error: Unable to fetch data.";
    }
});

