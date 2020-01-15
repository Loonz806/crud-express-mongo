// main.js
const update = document.getElementById("update");
update.addEventListener("click", () => {
  // Send PUT Request here
  axios({
    method: "put",
    url: "quotes",
    data: {
      name: "Darth Vader",
      quote: "I find your lack of faith disturbing"
    }
  });
});
