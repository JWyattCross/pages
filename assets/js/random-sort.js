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

    function rows() {
      return Array.from(list.querySelectorAll(".rlw-row"));
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

    function shuffleArray(a) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
    }

    function doShuffleAndRender(focusEnd = true) {
      const values = inputs()
        .map((i) => i.value.trim())
        .filter((v) => v !== "");

      shuffleArray(values);

      list.innerHTML = "";
      values.forEach((v) => createRow(v, false));
      createRow("", false);

      if (focusEnd) {
        const li = lastInput();
        li && li.focus();
      }
    }

    function ensureTrailingEmpty() {
      // Remove empty rows except the last one
      const arr = inputs();
      arr.forEach((inp, idx) => {
        const isLast = idx === arr.length - 1;
        if (!isLast && inp.value.trim() === "") {
          const row = inp.closest(".rlw-row");
          if (row) row.remove();
        }
      });

      // Ensure exactly one empty row at end
      const last = lastInput();
      if (!last || last.value.trim() !== "") {
        createRow("", false);
      }
    }

    // --- Drag & drop support ---
    let dragSrcRow = null;

    function setDragging(row, isDragging) {
      if (!row) return;
      row.style.opacity = isDragging ? "0.65" : "";
    }

    function bindRowDnD(row) {
      row.addEventListener("dragstart", (e) => {
        dragSrcRow = row;
        setDragging(row, true);
        e.dataTransfer.effectAllowed = "move";
        // Required for Firefox to start dragging
        e.dataTransfer.setData("text/plain", "rlw");
      });

      row.addEventListener("dragend", () => {
        setDragging(row, false);
        dragSrcRow = null;
        ensureTrailingEmpty();
      });

      row.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      });

      row.addEventListener("drop", (e) => {
        e.preventDefault();
        if (!dragSrcRow || dragSrcRow === row) return;

        // Don't allow dropping onto the trailing empty row
        const targetInput = row.querySelector(".rlw-item");
        const srcInput = dragSrcRow.querySelector(".rlw-item");
        if (!targetInput || !srcInput) return;

        const isTargetTrailingEmpty =
          targetInput.value.trim() === "" &&
          row === rows()[rows().length - 1];

        if (isTargetTrailingEmpty) return;

        // Reorder: insert src before/after target based on mouse position
        const rect = row.getBoundingClientRect();
        const before = e.clientY < rect.top + rect.height / 2;

        if (before) {
          list.insertBefore(dragSrcRow, row);
        } else {
          list.insertBefore(dragSrcRow, row.nextSibling);
        }
      });
    }

    function createRow(value = "", shouldFocus = false, insertAfterRow = null) {
      const row = document.createElement("div");
      row.className = "rlw-row";
      row.style.display = "flex";
      row.style.gap = "0.5rem";
      row.style.alignItems = "center";
      row.style.marginBottom = "0.5rem";

      const handle = document.createElement("span");
      handle.className = "rlw-handle";
      handle.textContent = "☰";
      handle.title = "Drag to reorder";
      handle.style.cursor = "grab";
      handle.style.userSelect = "none";
      handle.style.padding = "0.15rem 0.35rem";
      handle.style.borderRadius = "6px";
      handle.style.border = "1px solid rgba(0,0,0,0.15)";
      handle.style.background = "rgba(0,0,0,0.03)";
      handle.style.lineHeight = "1";
      handle.style.fontSize = "0.95rem";

      // Make only the handle draggable (row is draggable, but user grabs handle)
      row.draggable = true;
      row.addEventListener("mousedown", () => (handle.style.cursor = "grabbing"));
      row.addEventListener("mouseup", () => (handle.style.cursor = "grab"));
      row.addEventListener("mouseleave", () => (handle.style.cursor = "grab"));

      const input = document.createElement("input");
      input.type = "text";
      input.className = "rlw-item";
      input.placeholder = "Type item...";
      input.value = value;
      input.style.flex = "1";

      // Typing in last row creates a new trailing row (no focus steal)
      input.addEventListener("input", () => {
        const arr = inputs();
        const isLast = input === arr[arr.length - 1];
        if (isLast && input.value.trim() !== "") {
          const last = lastInput();
          if (last && last.value.trim() !== "") createRow("", false);
        }
      });

      input.addEventListener("blur", () => ensureTrailingEmpty());

      input.addEventListener("keydown", (e) => {
        const arr = inputs();
        const idx = arr.indexOf(input);
        const isEmpty = input.value.trim() === "";

        const isMac = navigator.platform.toUpperCase().includes("MAC");
        const accel = isMac ? e.metaKey : e.ctrlKey;

        // Ctrl/Cmd+Enter: shuffle
        if (e.key === "Enter" && accel) {
          e.preventDefault();
          doShuffleAndRender(true);
          return;
        }

        // Enter / Shift+Enter behavior
        if (e.key === "Enter") {
          e.preventDefault();

          if (e.shiftKey) {
            // Insert a new row below current and focus it
            const currentRow = input.closest(".rlw-row");
            const newRow = createRow("", true, currentRow);
            ensureTrailingEmpty();
            return;
          }

          // Normal Enter: move down (create next if needed)
          let next = arr[idx + 1];
          if (!next) {
            createRow("", false);
            next = lastInput();
          }
          ensureTrailingEmpty();
          next && next.focus();
          return;
        }

        // Esc: blur / exit edit mode
        if (e.key === "Escape") {
          e.preventDefault();
          input.blur();
          return;
        }

        // Tab: keep navigation within list
        if (e.key === "Tab") {
          e.preventDefault();
          if (e.shiftKey) {
            focusAt(idx - 1);
          } else {
            let next = arr[idx + 1];
            if (!next) {
              if (input.value.trim() !== "") {
                createRow("", false);
                next = lastInput();
              } else {
                next = input;
              }
            }
            next && next.focus();
          }
          return;
        }

        // ArrowUp: move up if caret at start
        if (e.key === "ArrowUp") {
          if (input.selectionStart === 0 && input.selectionEnd === 0) {
            e.preventDefault();
            focusAt(idx - 1);
          }
          return;
        }

        // ArrowDown: move down if caret at end
        if (e.key === "ArrowDown") {
          const atEnd =
            input.selectionStart === input.value.length &&
            input.selectionEnd === input.value.length;
          if (atEnd) {
            e.preventDefault();
            let next = arr[idx + 1];
            if (!next) {
              createRow("", false);
              next = lastInput();
            }
            next && next.focus();
          }
          return;
        }

        // Backspace on empty row: delete and move focus up
        if (e.key === "Backspace" && isEmpty) {
          const allInputs = inputs();
          if (allInputs.length <= 1) return;

          const allRows = rows();
          const currentRow = input.closest(".rlw-row");
          const isLastRow = currentRow === allRows[allRows.length - 1];

          // If it's the trailing empty row, don't delete; just move up
          if (isLastRow) {
            e.preventDefault();
            focusAt(idx - 1);
            return;
          }

          e.preventDefault();
          const prevIndex = Math.max(0, idx - 1);
          if (currentRow) currentRow.remove();
          ensureTrailingEmpty();
          focusAt(prevIndex);
          return;
        }
      });

      row.appendChild(handle);
      row.appendChild(input);

      // Insert row into DOM
      if (insertAfterRow && insertAfterRow.parentNode === list) {
        list.insertBefore(row, insertAfterRow.nextSibling);
      } else {
        list.appendChild(row);
      }

      bindRowDnD(row);

      if (shouldFocus) input.focus();
      return row;
    }

    btn.addEventListener("click", () => doShuffleAndRender(true));

    // Initial state
    list.innerHTML = "";
    createRow("", true);
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
