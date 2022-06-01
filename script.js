let div = document.createElement('div')
div.classList.add('container', 'glass')

// ---------- create heading elements ------------
let headingDiv = document.createElement('div')
headingDiv.classList.add('heading', 'text-center')

let h1 = document.createElement('h1')
h1.innerText = 'Welcome to Nationalize API'
let p = document.createElement('p')
p.innerText = 'Search for the nationality based on the name...'

// ---------- create search-box elements ------------
let searchBoxDiv = document.createElement('div')
searchBoxDiv.classList.add('search-box')

let inputBox = document.createElement('input')
inputBox.setAttribute('type', 'text')
inputBox.setAttribute('id', 'search-input')
inputBox.setAttribute('placeholder', 'Search...Name')

let searchBtn = document.createElement('button')
searchBtn.className = 'btn1'
searchBtn.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i>'
searchBtn.setAttribute('type', 'button')
searchBtn.setAttribute('onclick', 'search()')

let resetBtn = document.createElement('button')
resetBtn.className = 'btn2'
resetBtn.innerHTML = '<i class="fa-solid fa-arrows-rotate"></i>'
resetBtn.setAttribute('type', 'button')
resetBtn.setAttribute('onclick', 'reset()')

// ---------- create temp-content elements ------------
let tempContent = document.createElement('div')
tempContent.classList.add('temp-content')
tempContent.innerHTML = `
<div class="row">
  <h4 class="temp-h4 text-muted">You will search... Show datas like below</h4>
  <div class="offset-2 col-4 col-sm-12 col-md-12 col-lg-4 text-left temp-mrg-lf">
      <p id="temp-name">Name: Your search name</p>
      <p id="temp-country-id">Country: Country Code</p>
      <p id="temp-prob">Probability: Prob Value</p>
  </div>

  <div class="col-4 col-sm-12 col-md-12 col-lg-4 text-left temp-mrgn-lf">
      <p id="temp-name-1">Name: Your search name</p>
      <p id="temp-country-id-1">Country: Country Code</p>
      <p id="temp-prob-1">Probability: Prob Value</p>
  </div>
</div>`

let contentDiv = document.createElement('div')
contentDiv.className = 'content'
contentDiv.innerHTML = ''

div.append(headingDiv, searchBoxDiv, tempContent, contentDiv)
headingDiv.append(h1, p)
searchBoxDiv.append(inputBox, searchBtn, resetBtn)

document.body.prepend(div)

//
// getting data by async & await with fetch()

async function search() {
  try {
    let inputValue = document.getElementById('search-input').value
    if (inputValue == '') {
      alert('Please enter a name to search!!!')
    } else {
      let tempContent = document.querySelector('.temp-content')
      tempContent.style = 'display: none;'

      let req = await fetch(`https://api.nationalize.io/?name=${inputValue}`)
      let req1 = await req.json()

      let country_id_1 = req1.country[0].country_id
      let probability_1 = req1.country[0].probability

      let country_id_2 = req1.country[1].country_id
      let probability_2 = req1.country[1].probability

      // ---------- create result-content elements ------------
      contentDiv.innerHTML = `
      <div class="heading-2">
         <h3>Results of the top 2 countries</h3>
      </div>
      <div class="row">
        <div class="offset-2 col-4 col-sm-12 col-md-12 col-lg-4 text-left mrg-lf">
            <p id="name"></p>
            <p id="country-id"></p>
            <p id="prob"></p>
        </div>  
      
        <div class="col-4 col-sm-12 col-md-12 col-lg-4 text-left mrgn-lf">
            <p id="name-1"></p>
            <p id="country-id-1"></p>
            <p id="prob-1"></p>
        </div>
      </div>`

      document.getElementById('name').innerText = `Name: ${inputValue}`
      document.getElementById(
        'country-id'
      ).innerText = `Country: ${country_id_1}`
      document.getElementById(
        'prob'
      ).innerText = `Probability: ${probability_1}`

      document.getElementById('name-1').innerText = `Name: ${inputValue}`
      document.getElementById(
        'country-id-1'
      ).innerText = `Country: ${country_id_2}`
      document.getElementById(
        'prob-1'
      ).innerText = `Probability: ${probability_2}`
    }
  } catch (error) {
    console.log(error)
  }
}

// reset btn function
function reset() {
  let inputValue = (document.getElementById('search-input').value = '')
}
