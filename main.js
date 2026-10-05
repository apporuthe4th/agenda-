const daySpace = document.querySelector("#days");
const monthTitle = document.querySelector("#month-title");
const previousMonthButton = document.querySelector("#previous-month");
const nextMonthButton = document.querySelector("#next-month");
const displayedMonth = new Date();

function renderMonth() {
  const year = displayedMonth.getFullYear();
  const month = displayedMonth.getMonth();
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weekCount = Math.ceil((firstWeekday + daysInMonth) / 7);

  monthTitle.textContent = displayedMonth.toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });
  daySpace.replaceChildren();
  daySpace.style.gridTemplateRows = `repeat(${weekCount}, minmax(0, 1fr))`;

  for (let offset = 0; offset < firstWeekday; offset++) {
    const emptyDay = document.createElement("li");
    emptyDay.setAttribute("aria-hidden", "true");
    emptyDay.className = "empty-day";
    daySpace.appendChild(emptyDay);
  }

  for (let dayNumber = 1; dayNumber <= daysInMonth; dayNumber++) {
    const day = document.createElement("li");
    day.textContent = dayNumber;
    daySpace.appendChild(day);
  }
}

previousMonthButton.addEventListener("click", () => {
  displayedMonth.setMonth(displayedMonth.getMonth() - 1);
  renderMonth();
});

nextMonthButton.addEventListener("click", () => {
  displayedMonth.setMonth(displayedMonth.getMonth() + 1);
  renderMonth();
});

renderMonth();
