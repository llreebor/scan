// Initialize submenu toggle functionality for both desktop and mobile
function initializeSubmenu() {
	const triggers = document.querySelectorAll(".submenu-trigger")

	triggers.forEach((trigger) => {
		const btn = trigger.querySelector('[aria-haspopup="true"]')
		if (!btn) return

		btn.addEventListener("click", (e) => {
			e.stopPropagation()

			const isOpen = trigger.classList.contains("is-open")

			// Close all open submenus
			document.querySelectorAll(".submenu-trigger.is-open").forEach((el) => {
				el.classList.remove("is-open")
				el.querySelector('[aria-haspopup="true"]').setAttribute(
					"aria-expanded",
					"false",
				)
			})

			// Open current submenu if it was closed
			if (!isOpen) {
				trigger.classList.add("is-open")
				btn.setAttribute("aria-expanded", "true")
			}
		})
	})

	// Click outside any submenu — close all
	document.addEventListener("click", () => {
		document.querySelectorAll(".submenu-trigger.is-open").forEach((el) => {
			el.classList.remove("is-open")
			el.querySelector('[aria-haspopup="true"]').setAttribute(
				"aria-expanded",
				"false",
			)
		})
	})
}

// Initialize custom language select
function initializeCustomSelects() {
	const selects = document.querySelectorAll(".select-group")

	if (selects.length < 0) return

	selects.forEach((select) => {
		const trigger = select.querySelector(".select-trigger")
		const display = select.querySelector(".selected-option")
		const valueInput = select.querySelector(".selected-value")
		const optionsContainer = select.querySelector(".select-options")
		const options = select.querySelectorAll(".select-option")
		const errorMsg = select.querySelector(".select-error")

		if (!trigger || !display || !optionsContainer || !options.length) return

		// Select first option by default
		const firstOption = options[0]
		if (firstOption) {
			display.innerText = firstOption.innerText.trim()
			if (valueInput) valueInput.value = firstOption.innerText.trim()
		}

		// Toggle dropdown
		trigger.addEventListener("click", (e) => {
			if (select.classList.contains("disabled")) return // Prevent interaction if disabled
			select.classList.toggle("active")
			e.stopPropagation()
			optionsContainer.classList.remove("hidden")
			trigger.classList.toggle("active")
		})

		// Select option
		options.forEach((option) => {
			option.addEventListener("click", () => {
				const selectedText = option.innerText
				display.innerText = selectedText
				valueInput.value = selectedText

				optionsContainer.classList.add("hidden")
				trigger.classList.remove("active")

				// Remove error, add success
				select.classList.remove("error")
				select.classList.add("success")
				select.classList.remove("active")

				// Hide error message
				if (errorMsg) errorMsg.classList.add("hidden")
			})
		})

		// Close dropdown when clicking outside
		document.addEventListener("click", (e) => {
			if (!select.contains(e.target)) {
				optionsContainer.classList.add("hidden")
				trigger.classList.remove("active")
				select.classList.remove("active")
			}
		})

		// Close dropdown on Escape key
		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape") {
				optionsContainer.classList.add("hidden")
				trigger.classList.remove("active")
				select.classList.remove("active")
			}
		})
	})
}

// Inits
document.addEventListener("DOMContentLoaded", () => {
	// Mobile Submenu
	initializeSubmenu()

	// Lang Select
	initializeCustomSelects()

	// Case B page | eBooks Slider
	if (document.querySelector(".swiper-ebooks")) {
		new Swiper(".swiper-ebooks", {
			// Options
			spaceBetween: 40,
			// Responsive breakpoints
			breakpoints: {
				320: {
					slidesPerView: 1.7,
				},
				640: {
					slidesPerView: 2.8,
				},
				768: {
					slidesPerView: 3.2,
				},
				1024: {
					slidesPerView: 5,
				},
			},
		})
	}
})
