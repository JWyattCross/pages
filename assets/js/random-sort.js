(function () {
  function initWidget(root) {
    if (root.dataset.rlwInited === "1") return;

    const list = root.querySelector(".rlw-list");
    const btn = root.querySelector(".rlw-randomize");
    if (!list || !btn) return;

    root.dataset.rlwInited = "1";

    function inputs() {
      return Array.from(list.querySelectorAll(".rlw-item"));
    }

    function lastInput() {
      const arr = inputs();
      return arr[arr.length - 1] || null;
    }

    function focusAt(index) {
      const arr = inputs();
      if (arr.length === 0) return;
      const clamped = Math.max(0, Math.min(index, arr.length - 1));
      arr[clamped].focus();
    }

    function cleanupEnsureTrailingEmpty() {
      const arr = inputs();

      // Remove empty rows except the last one
      arr.forEach((inp, idx) => {
        const isLast = idx === arr.length - 1;
        if (!isLast && inp.value.trim() === "") inp.remove();
      });

      // Ensure there is always one empty row at the end
      const last = lastInput();
      if (!last || last.value.trim() !== "") {
        createInput("", false);
      }
    }

    function createInput(value = "", shouldFocus = false, insertAfterEl = null) {
      const input = document.createElement("input");
      input.type = "text";
      input.className = "rlw-item";
      input.placeholder = "Type item...";
      input.value = value;

      // When typing in the last row, ensure a new row exists (but don't steal focus)
      input.addEventListener("input", () => {
        const arr = inputs();
        const isLast = input === arr[arr.length - 1];
        if (isLast && input.value.trim() !== "") {
          // Add trailing row only if none exists already empty
          const last = lastInput();
          if (last && last.value.trim() !== "") createInput("", false);
        }
      });

      input.addEventListener("blur", () => {
        cleanupEnsureTrailingEmpty();
      });

      input.addEventListener("keydown", (e) => {
        const arr = inputs();
        const idx = arr.indexOf(input);
        const isEmpty = input.value.trim() === "";

        // Enter: next row
        // Shift+Enter: insert new row below
        if (e.key === "Enter") {
          e.preventDefault();

          if (e.shiftKey) {
            // Insert a new row below current, focus it
            const newInp = createInput("", true, input);
            // Keep trailing empty
            cleanupEnsureTrailingEmpty();
            return;
          }

          // Normal Enter: move down (create next if needed)
          let next = arr[idx + 1];
          if (!next) {
            createInput("", false);
            next = lastInput();
          }
          cleanupEnsureTrailingEmpty();
          next && next.focus();
          return;
        }

        // Tab: move down/up inside the list (prevent leaving widget)
        if (e.key === "Tab") {
          e.preventDefault();
          if (e.shiftKey) {
            // Shift+Tab: move up
            focusAt(idx - 1);
          } else {
            // Tab: move down; create if at end and current has content
            let next = arr[idx + 1];
            if (!next) {
              // If we're on the last row and it has content, create a new one
              if (input.value.trim() !== "") {
                createInput("", false);
                next = lastInput();
              } else {
                // If last row is empty, just stay here
                next = input;
              }
            }
            next && next.focus();
          }
          return;
        }

        // Arrow navigation
        if (e.key === "ArrowUp") {
          // Don't hijack cursor movement inside text unless at start
          if (input.selectionStart === 0 && input.selectionEnd === 0) {
            e.preventDefault();
            focusAt(idx - 1);
          }
          return;
        }

        if (e.key === "ArrowDown") {
          // Don't hijack cursor movement unless at end
          const atEnd = input.selectionStart === input.value.length && input.selectionEnd === input.value.length;
          if (atEnd) {
            e.preventDefault();
            // Ensure next exists
            let next = arr[idx + 1];
            if (!next) {
              createInput("", false);
              next = lastInput();
            }
            next && next.focus();
          }
          return;
        }

        // Backspace on empty row: delete row and move focus up
        if (e.key === "Backspace" && isEmpty) {
          // Don't delete the only row / last trailing empty row if it's the only one
          if (arr.length <= 1) return;

          const isLast = idx === arr.length - 1;
          // If it's the last trailing empty row, don't delete it; just move up
          if (isLast) {
            e.preventDefault();
            focusAt(idx - 1);
            return;
          }

          // Delete this row and focus previous
          e.preventDefault();
          const prevIndex = Math.max(0, idx - 1);
          input.remove();
          cleanupEnsureTrailingEmpty();
          focusAt(prevIndex);
          return;
        }
      });

      // Insert into DOM (either after a given element or append)
      if (insertAfterEl && insertAfterEl.parentNode === list) {
        list.insertBefore(input, insertAfterEl.nextSibling);
      } else {
        list.appendChild(input);
      }

      if (shouldFocus) input.focus();
      return input;
    }

    function shuffleArray(a) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
    }

    btn.addEventListener("click", () => {
      const values = inputs()
        .map((i) => i.value.trim())
        .filter((v) => v !== "");

      shuffleArray(values);

      list.innerHTML = "";
      values.forEach((v) => createInput(v, false));
      createInput("", false);
      // Focus first empty (end)
      const li = lastInput();
      li && li.focus();
    });

    // Initial state
    list.innerHTML = "";
    createInput("", true);
  }

  function initAllWidgets() {
    document.querySelectorAll(".rlw-widget").forEach(initWidget);
  }

  // Run now + retry briefly (theme may inject content late)
  initAllWidgets();
  let tries = 0;
  const timer = setInterval(() => {
    tries++;
    initAllWidgets();
    if (document.querySelector(".rlw-widget[data-rlw-inited='1']") || tries > 50) {
      clearInterval(timer);
    }
  }, 100);
})();
