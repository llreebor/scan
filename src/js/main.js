// Initialize mobile menu and submenu functionality
function initializeMobileMenu() {
	// Select main DOM elements for mobile menu
	const menu = document.querySelector("#mobile-menu")
	const overlay = document.querySelector("#mobile-menu-overlay")
	const burger = document.querySelector("#burger")
	const body = document.querySelector("body")

	// Define mobile breakpoint for responsive behavior
	const MOBILE_BREAKPOINT = 992

	// Exit if required elements are missing
	if (!menu || !burger || !body || !overlay) return

	// ============================
	// MENU TOGGLE FUNCTIONALITY
	// ============================

	const updateMenuState = (isOpen) => {
		burger.setAttribute("aria-expanded", isOpen)
		burger.classList.toggle("active", isOpen)

		menu.classList.toggle("is-open", isOpen)
		menu.classList.toggle("-translate-x-full", !isOpen)
		menu.classList.toggle("translate-x-0", isOpen)

		overlay.classList.toggle("opacity-0", !isOpen)
		overlay.classList.toggle("opacity-100", isOpen)
		overlay.classList.toggle("pointer-events-none", !isOpen)
		overlay.classList.toggle("pointer-events-auto", isOpen)

		body.classList.toggle("overflow-hidden", isOpen)
	}

	const handleBurgerClick = () => {
		const isOpening = !menu.classList.contains("is-open")
		updateMenuState(isOpening)
	}

	const handleOverlayClick = (event) => {
		if (event.target === overlay) updateMenuState(false)
	}

	const handleEscapeKey = (event) => {
		if (event.key === "Escape" && menu.classList.contains("is-open")) {
			updateMenuState(false)
		}
	}

	const handleWindowResize = () => {
		if (window.innerWidth >= MOBILE_BREAKPOINT) {
			updateMenuState(false)
		}
	}

	// Add event listeners for main menu
	burger.addEventListener("click", handleBurgerClick)
	overlay.addEventListener("click", handleOverlayClick)
	document.addEventListener("keydown", handleEscapeKey)
	window.addEventListener("resize", handleWindowResize)

	burger.setAttribute("aria-expanded", "false")
	handleWindowResize()

	// ============================
	// SUBMENU FUNCTIONALITY
	// ============================

	// Check if there are submenu triggers at all
	const submenuTriggersExist = menu.querySelector(".submenu-trigger")

	if (submenuTriggersExist) {
		menu.addEventListener("click", (event) => {
			const trigger = event.target.closest(".submenu-trigger")
			if (!trigger) return

			const submenuItem = trigger.closest(".with-submenu")
			if (submenuItem) {
				submenuItem.classList.toggle("active")
			}
		})
	}

	// ============================
	// LINK CLICK CLOSE MENU
	// ============================

	menu.addEventListener("click", (event) => {
		const link = event.target.closest("a")
		if (!link) return

		const href = link.getAttribute("href")
		if (href && href !== "#") {
			updateMenuState(false)
		}
	})
}

// Initialize custom language select
function initializeCustomSelects() {
	const selects = document.querySelectorAll(".select-group")

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
	// Mobile Menu
	initializeMobileMenu()

	// Lang Select
	initializeCustomSelects()
})
