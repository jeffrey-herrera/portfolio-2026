import React, { useEffect } from "react";

export function StatusPillStyles() {
	useEffect(() => {
		const style = document.createElement("style");
		style.id = "sanity-status-pill-styles";
		style.textContent = `
      [data-ui="Badge"][data-tone="positive"] {
        background-color: #10B981 !important;
        color: white !important;
      }
      
      [data-ui="Badge"][data-tone="caution"] {
        background-color: #F59E0B !important;
        color: white !important;
      }
      
      [data-ui="Text"][data-muted="true"] {
        color: rgba(0, 0, 0, 0.3) !important;
      }
    `;

		const existingStyle = document.getElementById("sanity-status-pill-styles");
		if (existingStyle) {
			document.head.removeChild(existingStyle);
		}

		document.head.appendChild(style);

		const fixOrangeBackgrounds = () => {
			const orangeElements = document.querySelectorAll(
				'[style*="background-color: rgb(255, 105, 0)"], [style*="background: rgb(255, 105, 0)"]'
			);

			orangeElements.forEach((element) => {
				if (element instanceof HTMLElement) {
					element.style.color = "white";

					const allChildren = element.querySelectorAll("*");
					allChildren.forEach((child) => {
						if (child instanceof HTMLElement) {
							child.style.color = "white";
							if (child.tagName === "svg" || child.querySelector("svg")) {
								child.style.fill = "white";
								const svgs = child.querySelectorAll("svg");
								svgs.forEach((svg) => {
									if (svg instanceof HTMLElement) {
										svg.style.fill = "white";
										svg.style.color = "white";
									}
								});
							}
						}
					});
				}
			});
		};

		fixOrangeBackgrounds();

		const observer = new MutationObserver(() => {
			fixOrangeBackgrounds();
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
			attributes: true,
			attributeFilter: ["style", "class"],
		});

		const interval = setInterval(fixOrangeBackgrounds, 100);

		return () => {
			observer.disconnect();
			clearInterval(interval);
			const styleToRemove = document.getElementById("sanity-status-pill-styles");
			if (styleToRemove) {
				document.head.removeChild(styleToRemove);
			}
		};
	}, []);

	return null;
}

export default StatusPillStyles;
