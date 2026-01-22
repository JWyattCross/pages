(function () {
  function initWidget(root) {
    const list = root.querySelector(".rlw-list");
    const btn = root.querySelector(".rlw-randomize");
    if (!list || !btn) return;

    function createInput(value = "", shouldFocus = false) {
      const input = document.createElement("input");
      input.type = "text";
      input.className = "rlw-item";
      input.placeholder = "Type item...";
      input.value = value;

      input.addEventListener("input", () => {
        const inputs = list.querySelectorAll(".rlw-item");
        const isLast = input === inputs[inputs.length - 1];
        if (isLast && input.value.trim() !== "") createInput("", false);
      });

      input.addEventListener("blur", cleanup);

      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          input.blur();
        }
      });

      list.appendChild(input);
      if (shouldFocus) input.focus();
    }

    function cleanup() {
      const inputs = Array.from(list.querySelectorAll(".rlw-item"));
      inputs.forEach((inp, idx) => {
        if (idx !== inputs.length - 1 && inp.value.trim() === "") inp.remove();
      });
      const last = list.querySelector(".rlw-item:last-child");
      if (!last || last.value.trim() !== "") createInput("", false);
    }

    function shuffle(a) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
    }

    if (root.dataset.rlwInited === "1") return;
    root.dataset.rlwInited = "1";

    btn.addEventListener("click", () => {
      const values = Array.from(list.querySelectorAll(".rlw-item"))
        .map((i) => i.value.trim())
        .filter((v) => v !== "");

      shuffle(values);

      list.innerHTML = "";
      values.forEach((v) => createInput(v, false));
      createInput("", false);
    });

    list.innerHTML = "";
    createInput("", true);
  }

  function initAll() {
    document.querySelectorAll(".rlw-widget").forEach(initWidget);
  }

  // Try now + retry briefly in case theme loads content late
  initAll();
  let tries = 0;
  const timer = setInterval(() => {
    tries++;
    initAll();
    if (document.querySelector(".rlw-widget[data-rlw-inited='1']") || tries > 50) {
      clearInterval(timer);
    }
  }, 100);
})();
