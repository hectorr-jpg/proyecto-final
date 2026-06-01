// ======================== LISTA DE ALIMENTOS (costo anterior y costo actual al 25/05/2026) ========================
const foodItems = [
  { name: "Docena de pimientos", previous: 10, current: 15 },
  { name: "3 libras de zanahoria", previous: 8, current: 5 },
  { name: "3 libras de cebolla verde", previous: 5, current: 15 },
  { name: "3 libras de locoto", previous: 25, current: 10 },
  { name: "3 libras de vainita", previous: 12, current: 20 },
  { name: "Unidad de piña", previous: 12, current: 20 }
];

// Historial de variaciones para predicción (guardamos últimas 2 variaciones)
let variationHistory = [];

function initVariationHistory() {
  variationHistory = [];
  foodItems.forEach(item => {
    let varPct = ((item.current - item.previous) / item.previous) * 100;
    variationHistory.push([varPct]);
  });
}
initVariationHistory();

let currentPrices = {};

function updatePriceTable() {
  const tbody = document.getElementById("priceTableBody");
  if (!tbody) return;
  tbody.innerHTML = "";
  foodItems.forEach((item, idx) => {
    const variation = ((item.current - item.previous) / item.previous * 100).toFixed(1);
    const variationSymbol = variation > 0 ? `▲ +${variation}%` : (variation < 0 ? `▼ ${variation}%` : `● 0%`);
    let predicted = item.current;
    if (variationHistory[idx] && variationHistory[idx].length >= 2) {
      let avgVar = (variationHistory[idx][0] + variationHistory[idx][1]) / 2;
      predicted = item.current * (1 + avgVar / 100);
    } else if (variationHistory[idx] && variationHistory[idx].length === 1) {
      predicted = item.current * (1 + variationHistory[idx][0] / 100);
    }
    predicted = Math.round(predicted * 10) / 10;
    currentPrices[item.name] = item.current;
    const row = `
      <tr>
        <td>${item.name}</td>
        <td>${item.previous.toFixed(2)} Bs</td>
        <td><strong>${item.current.toFixed(2)} Bs</strong> (25/05/2026)</td>
        <td>${variationSymbol}</td>
        <td>${predicted.toFixed(2)} Bs</td>
      </tr>
    `;
    tbody.insertAdjacentHTML('beforeend', row);
  });
}

function nextWeek() {
  for (let i = 0; i < foodItems.length; i++) {
    const item = foodItems[i];
    let currentVar = ((item.current - item.previous) / item.previous) * 100;
    if (!variationHistory[i]) variationHistory[i] = [];
    variationHistory[i].unshift(currentVar);
    if (variationHistory[i].length > 2) variationHistory[i].pop();
    
    let changePercent = (Math.random() * 35) - 15;
    if (Math.random() < 0.1) changePercent = 0;
    let newPrice = item.current * (1 + changePercent / 100);
    newPrice = Math.max(0.5, Math.round(newPrice * 10) / 10);
    item.previous = item.current;
    item.current = newPrice;
  }
  updatePriceTable();
  renderShoppingList();
  updateBudgetDisplay();
}

function resetPricesToInitial() {
  const initialData = [
    { previous: 10, current: 15 },
    { previous: 8, current: 5 },
    { previous: 5, current: 15 },
    { previous: 25, current: 10 },
    { previous: 12, current: 20 },
    { previous: 12, current: 20 }
  ];
  for (let i = 0; i < foodItems.length; i++) {
    foodItems[i].previous = initialData[i].previous;
    foodItems[i].current = initialData[i].current;
  }
  initVariationHistory();
  updatePriceTable();
  renderShoppingList();
  updateBudgetDisplay();
}

// ======================== SIMULADOR DE COMPRAS ========================
let shoppingQuantities = {};

function renderShoppingList() {
  const container = document.getElementById("shoppingListContainer");
  if (!container) return;
  container.innerHTML = "<h3>🛍️ Selecciona cantidades:</h3>";
  for (let [productName, price] of Object.entries(currentPrices)) {
    const qty = shoppingQuantities[productName] || 0;
    const div = document.createElement("div");
    div.className = "product-row";
    div.innerHTML = `
      <label>${productName} (${price} Bs):</label>
      <input type="number" min="0" step="0.5" value="${qty}" data-product="${productName}" class="qty-input">
    `;
    container.appendChild(div);
  }
  document.querySelectorAll(".qty-input").forEach(inp => {
    inp.addEventListener("change", (e) => {
      const prod = e.target.dataset.product;
      shoppingQuantities[prod] = parseFloat(e.target.value) || 0;
      updateBudgetDisplay();
    });
  });
}

function updateBudgetDisplay() {
  const budget = parseFloat(document.getElementById("budgetInput").value);
  let total = 0;
  for (let [prod, qty] of Object.entries(shoppingQuantities)) {
    const price = currentPrices[prod] || 0;
    total += price * qty;
  }
  total = Math.round(total * 100) / 100;
  const remaining = budget - total;
  const missing = remaining < 0 ? Math.abs(remaining) : 0;
  let status = "";
  if (total === 0) status = "No has seleccionado productos.";
  else if (remaining >= 0) status = `✅ PRESUPUESTO ALCANZA. Saldo restante: ${remaining.toFixed(2)} Bs.`;
  else status = `❌ NO ALCANZA. Faltan ${missing.toFixed(2)} Bs.`;
  document.getElementById("budgetDetails").innerHTML = `
    <strong>Total compra:</strong> ${total.toFixed(2)} Bs<br>
    <strong>Presupuesto:</strong> ${budget.toFixed(2)} Bs<br>
    <strong>${status}</strong>
  `;
}

// ======================== SIMULADOR DE COLA DE GASOLINA ========================
function simulateGasStation() {
  const cisternTimeStr = document.getElementById("cisternTime").value;
  const carModel = document.getElementById("carModel").value;
  const totalCars = parseInt(document.getElementById("totalCars").value);
  const myPosition = parseInt(document.getElementById("myPosition").value);
  
  if (isNaN(totalCars) || isNaN(myPosition) || myPosition < 1 || myPosition > totalCars) {
    document.getElementById("gasSimText").innerHTML = "❌ Error: Verifica que tu posición esté entre 1 y el total de autos.";
    document.getElementById("gasSimDetails").innerHTML = "";
    return;
  }
  
  const totalFuel = 1500;
  const consumption = { compacto: 35, moderno: 45, minibus: 60 };
  const litersPerCar = consumption[carModel];
  const avgConsumption = (0.4 * 35) + (0.35 * 45) + (0.25 * 60);
  let fuelNeededBeforeMe = 0;
  for (let i = 1; i < myPosition; i++) fuelNeededBeforeMe += avgConsumption;
  fuelNeededBeforeMe += litersPerCar;
  
  const minutesPerCar = 2;
  const totalMinutesToAttend = myPosition * minutesPerCar;
  const [cisternHour, cisternMin] = cisternTimeStr.split(":").map(Number);
  let attentionDate = new Date();
  attentionDate.setHours(cisternHour, cisternMin, 0, 0);
  attentionDate.setMinutes(attentionDate.getMinutes() + totalMinutesToAttend);
  const attentionTimeStr = attentionDate.toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' });
  
  let resultMsg = "";
  let detailMsg = "";
  if (fuelNeededBeforeMe <= totalFuel) {
    const remainingFuel = (totalFuel - fuelNeededBeforeMe).toFixed(1);
    resultMsg = "✅ ¡SÍ alcanzarás a cargar gasolina!";
    detailMsg = `Combustible necesario hasta tu turno: ${fuelNeededBeforeMe.toFixed(1)} litros. Quedarán ${remainingFuel} litros después de atenderte. Hora estimada de atención: ${attentionTimeStr}.`;
  } else {
    const falta = (fuelNeededBeforeMe - totalFuel).toFixed(1);
    resultMsg = "❌ NO alcanzarás a cargar gasolina.";
    detailMsg = `Se necesitan ${fuelNeededBeforeMe.toFixed(1)} litros para atender hasta tu posición, pero la cisterna solo tiene ${totalFuel} litros. Faltan ${falta} litros. Tu turno llegaría aproximadamente a las ${attentionTimeStr} pero el combustible se agotará antes.`;
  }
  document.getElementById("gasSimText").innerHTML = resultMsg;
  document.getElementById("gasSimDetails").innerHTML = detailMsg;
}

// ======================== VALIDADOR DE BILLETES (rangos BCB) ========================
const invalidRanges = {
  10: [[67250001, 67700000], [69050001, 69500000], [69500001, 69950000], [69950001, 70400000], [70400001, 70850000], [70850001, 71300000], [76310012, 85139995], [86400001, 86850000], [90900001, 91350000], [91800001, 92250000]],
  20: [[87280145, 91646549], [96550001, 97100000], [99650001, 100250000], [102250001, 107000000], [106500001, 109750000], [110500001, 115000000], [114500001, 120000000], [118500001, 125000000], [122500001, 130000000], [126500001, 135000000], [130500001, 140000000], [134500001, 145000000], [138500001, 150000000], [142500001, 155000000], [146500001, 160000000], [150500001, 165000000], [154500001, 170000000], [158500001, 175000000], [162500001, 180000000], [166500001, 185000000], [170500001, 190000000], [174500001, 195000000], [178500001, 200000000], [182500001, 205000000]],
  50: [[77100001, 77550000], [78000001, 78450000], [78900001, 96350000], [96350001, 96800000], [96800001, 97250000], [98150001, 98600000], [104900001, 105350000], [105350001, 105800000], [106700001, 107150000], [107600001, 108050000], [108050001, 108500000], [109400001, 109850000]]
};

function isSerialInvalid(denom, serialNum) {
  const num = parseInt(serialNum, 10);
  if (isNaN(num)) return false;
  const ranges = invalidRanges[denom];
  if (!ranges) return false;
  return ranges.some(([low, high]) => num >= low && num <= high);
}

function validateBill() {
  const denom = parseInt(document.getElementById("billDenom").value);
  const serial = document.getElementById("serialNumber").value.trim();
  const resultDiv = document.getElementById("billResult");
  if (!serial) {
    resultDiv.innerHTML = `<span style="color:orange;">⚠️ Ingrese un número de serie.</span>`;
    return;
  }
  if (!/^\d+$/.test(serial)) {
    resultDiv.innerHTML = `<span style="color:red;">❌ Solo dígitos.</span>`;
    return;
  }
  const invalid = isSerialInvalid(denom, serial);
  if (invalid) {
    resultDiv.innerHTML = `<span style="color:red; font-weight:bold;">⚠️ BILLETE SIN VALOR LEGAL. Serie ${serial} de Bs${denom} NO tiene curso legal.</span>`;
  } else {
    resultDiv.innerHTML = `<span style="color:green; font-weight:bold;">✅ BILLETE VÁLIDO. Serie ${serial} de Bs${denom} es legal.</span>`;
  }
}

// ======================== EVENTOS (solo funcionales, sin botones de casos) ========================
function setupEventListeners() {
  document.getElementById("nextWeekBtn")?.addEventListener("click", nextWeek);
  document.getElementById("resetPricesBtn")?.addEventListener("click", resetPricesToInitial);
  document.getElementById("calcBudgetBtn")?.addEventListener("click", updateBudgetDisplay);
  document.getElementById("resetShoppingBtn")?.addEventListener("click", () => {
    for (let key in shoppingQuantities) shoppingQuantities[key] = 0;
    renderShoppingList();
    updateBudgetDisplay();
  });
  document.getElementById("simulateGasBtn")?.addEventListener("click", simulateGasStation);
  document.getElementById("validateBillBtn")?.addEventListener("click", validateBill);
}

// Inicialización
function init() {
  updatePriceTable();
  for (let item of foodItems) shoppingQuantities[item.name] = 0;
  renderShoppingList();
  updateBudgetDisplay();
  setupEventListeners();
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();