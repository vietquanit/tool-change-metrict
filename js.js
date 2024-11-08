// Hằng số chuyển đổi đơn vị
const conversionFactors = {
  cm: 0.01,
  dm: 0.1,
  mile: 1609.34,
  foot: 0.3048,
  inch: 0.0254,
  hand: 0.1,
  km: 1000,
  m: 1,
  micrometer: 1e-6,
  mm: 0.001,
  nanometer: 1e-9,
  yard: 0.9144,
};

const inputUnitItems = document.querySelectorAll("#input-unit li");
const outputUnitItems = document.querySelectorAll("#output-unit li");
const convertedLabelItems = document.querySelectorAll("#converted-label li");
const inputValue = document.getElementById("inputValue");

let currentInput = "";
let currentOutput = "";
let textInput = "";
let textOutput = "";

// Duyệt qua từng thẻ <li> và gán sự kiện click
inputUnitItems.forEach((item) => {
  item.addEventListener("click", function () {
    // Lấy giá trị của thuộc tính aria-label
    inputUnitItems.forEach((li) => li.classList.remove("active"));
    currentInput = this.getAttribute("aria-label");
    textInput = this.innerText;
    this.classList.add("active");
    // Hoặc xử lý dữ liệu này theo cách bạn mong muốn
    calculateResult();
    calculateRight();
  });
});
outputUnitItems.forEach((item) => {
  item.addEventListener("click", function () {
    // Lấy giá trị của thuộc tính aria-label
    outputUnitItems.forEach((li) => li.classList.remove("active"));
    currentOutput = this.getAttribute("aria-label");
    textOutput = this.innerText;
    this.classList.add("active");
    // Hoặc xử lý dữ liệu này theo cách bạn mong muốn
    calculateResult();
    calculateRight();

    // add class active to right
    convertedLabelItems.forEach((li) => li.classList.remove("active"));
    convertedLabelItems.forEach((label) => {
      let pathLabel = label.getAttribute("aria-label");
      if (currentOutput == pathLabel) {
        label.classList.add("active");
      }
    });
  });
});

inputValue.onchange = function (e) {
  let valu = e.target.value;
  if (isNaN(valu)) {
    document.getElementById("result").innerText =
      "Vui lòng nhập một giá trị hợp lệ.";
    return;
  } else {
    if (valu != null) {
      calculateResult();
      calculateRight();
    }
  }
  if (!valu) {
    const result = document.querySelector("#result p");
    result.textContent = "";
  }
};
function calculateResult() {
  let val = inputValue.value;
  if (currentInput != "" && currentOutput != "" && val) {
    const valueInMeters = val * conversionFactors[currentInput];
    const convertedValue = valueInMeters / conversionFactors[currentOutput];
    const result = document.querySelector("#result p");
    const displayValue = parseFloat(convertedValue.toFixed(4)).toString();
    result.textContent = `${val} ${textInput} = ${displayValue} ${textOutput}`;
  }
}

function calculateRight() {
  let val = inputValue.value;
  if (currentInput != "" && currentOutput != "" && val) {
    const valueInMeters = val * conversionFactors[currentInput];
    outputUnitItems.forEach((item) => {
      // const displayValue = parseFloat(convertedValue.toFixed(4)).toString();
      let output = item.getAttribute("aria-label");
      const convertedValue = valueInMeters / conversionFactors[output];
      const displayValue = parseFloat(convertedValue.toFixed(4)).toString();
      convertedLabelItems.forEach((label) => {
        let pathLabel = label.getAttribute("aria-label");
        if (output == pathLabel) {
          label.innerText = displayValue;
        }
      });
    });
  }
}
