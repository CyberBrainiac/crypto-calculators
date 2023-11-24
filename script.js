const form = document.getElementById('container');
form.addEventListener('submit', handleSubmit);

function getNewIndex() {
  const indexes = document.querySelectorAll('.index');
  return indexes.length + 1;
}

function createField() {
  const container = document.querySelector('.container');
  const calcBtn = document.querySelector('.calc-btn');
  const field = document.createElement('div');
  field.classList.add('field');
  const index = document.createElement('div');
  index.classList.add('index');
  index.textContent = getNewIndex();

  const elem1 = document.createElement('div');
  elem1.classList.add('elem');
  const priceText = document.createElement('div');
  priceText.classList.add('price-text');
  priceText.textContent = 'Price:';
  const priceInp = document.createElement('input');
  priceInp.classList.add('price-inp');
  priceInp.type = 'text';
  priceInp.name = "price";
  priceInp.required = "true";
  elem1.appendChild(priceText);
  elem1.appendChild(priceInp);

  const elem2 = document.createElement('div');
  elem2.classList.add('elem');
  const countText = document.createElement('div');
  countText.classList.add('count-text');
  countText.textContent = 'Count:';
  const countInp = document.createElement('input');
  countInp.classList.add('count-inp');
  countInp.type = 'text';
  countInp.name = "count";
  countInp.required = "true";
  elem2.appendChild(countText);
  elem2.appendChild(countInp);

  const removeBtn = document.createElement('button');
  removeBtn.classList.add('remove-btn');
  removeBtn.textContent = '-';
  removeBtn.onclick = () => removeField(removeBtn);

  field.appendChild(index);
  field.appendChild(elem1);
  field.appendChild(elem2);
  field.appendChild(removeBtn);
  container.appendChild(field);
  container.appendChild(calcBtn);
}

function removeField(elem) {
  form.removeChild(elem.parentNode);
}

function isLetter(char) {
  return isNaN(char);
} 

function convertToNumberArr(arr) {
  let numberArr = [];
  
  for (let str of arr) {
    let number = 0; 
    str = str.replace(',', '.');

    if(isLetter(str.charAt(0))) {
      cutStr = str.slice(1);

      if(isLetter(cutStr.charAt(0))) {
        alert(`Error, value ${str} is not a number`);
        return null;
      }
      number = parseFloat(cutStr);

      if(isNaN(number)) {
        alert(`Error, empty value!`);
        return null;
      }
      numberArr.push(number);
      continue;
    }

    number = parseFloat(str);
    if(isNaN(number)) {
      alert(`Error, empty value!`);
      return null;
    }
    numberArr.push(number);
  };

  return numberArr;
}

function handleSubmit(ev) {
  ev.preventDefault()
  const data = new FormData(ev.target);
  const averBuyContainer = document.getElementById('averBuyContainer');
  const coinAmountContainer = document.getElementById('coinAmountContainer');

  let rawPriceArr = [], priceArr = [];
  let rawCountArr = [], countArr = [];
  let sumCurrency = 0;
  let sumCount = 0;
  let avarageBuyPrice = 0;

  for (const [key, value] of data.entries()) {
    if (key === 'price') {
      rawPriceArr.push(value);
    } else {
      rawCountArr.push(value);
    }
  }

  if (rawCountArr.length === 0 || rawPriceArr.length === 0) {
    alert("Check is field exist");
    return null;
  }

  priceArr = convertToNumberArr(rawPriceArr);
  countArr = convertToNumberArr(rawCountArr);

  console.log(priceArr, countArr);
  if (!priceArr || !countArr) return null;

  for (let i = 0; i < priceArr.length; i++) {
    sumCurrency += priceArr[i] * countArr[i];
    sumCount += countArr[i];
  }

  if(sumCurrency === 0 || sumCount === 0) {
    alert("Unexpected value '0', write different value");
    return null;
  }

  avarageBuyPrice = Math.trunc(sumCurrency / sumCount * 100000) / 100000;
  sumCount = Math.trunc(sumCount * 100000) / 100000;
  averBuyContainer.textContent = String(avarageBuyPrice).replace('.', ',');
  coinAmountContainer.textContent = String(sumCount).replace('.', ',');
}