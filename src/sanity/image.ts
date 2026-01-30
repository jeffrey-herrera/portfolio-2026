import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { sanityClient } from "./client";

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
	if (!source) {
		throw new Error("Image source is required");
	}

	if (typeof source === "object" && !("asset" in source) && !("_ref" in source)) {
		throw new Error("Invalid image source: missing asset or _ref");
	}

	return builder.image(source);
}

export const imageSizes = {
	avatar: {
		small: { width: 64, height: 64 },
		medium: { width: 128, height: 128 },
		large: { width: 256, height: 256 },
	},
	playlist: {
		thumbnail: { width: 200, height: 200 },
		card: { width: 300, height: 300 },
		hero: { width: 600, height: 600 },
	},
	project: {
		thumbnail: { width: 300, height: 200 },
		card: { width: 500, height: 300 },
		hero: { width: 1200, height: 800 },
	},
	playground: {
		thumbnail: { width: 200, height: 200 },
		card: { width: 400, height: 400 },
		featured: { width: 800, height: 600 },
	},
};

export function getOptimizedImageProps(
	source: SanityImageSource,
	size: keyof typeof imageSizes | { width: number; height: number },
	options: {
		quality?: number;
		format?: "webp" | "jpg" | "png" | "auto";
		fit?: "crop" | "fill" | "fillmax" | "max" | "scale" | "clip" | "min";
	} = {}
) {
	const { quality = 85, format = "webp", fit = "crop" } = options;

	let dimensions: { width: number; height: number };

	if (typeof size === "string") {
		const [category, variant] = size.split(".") as [
			keyof typeof imageSizes,
			keyof (typeof imageSizes)[keyof typeof imageSizes]
		];
		dimensions = imageSizes[category][variant] as {
			width: number;
			height: number;
		};
	} else {
		dimensions = size;
	}

	const url = urlFor(source)
		.width(dimensions.width)
		.height(dimensions.height)
		.quality(quality)
		.format(format)
		.fit(fit)
		.url();

	return {
		src: url,
		width: dimensions.width,
		height: dimensions.height,
		loading: "lazy" as const,
	};
}

export function getResponsiveImageProps(
	source: SanityImageSource,
	baseSize: { width: number; height: number },
	options: {
		quality?: number;
		format?: "webp" | "jpg" | "png" | "auto";
		fit?: "crop" | "fill" | "fillmax" | "max" | "scale" | "clip" | "min";
		scales?: number[];
	} = {}
) {
	const { quality = 85, format = "webp", fit = "crop", scales = [1, 1.5, 2] } =
		options;

	const srcset = scales
		.map((scale) => {
			const width = Math.round(baseSize.width * scale);
			const height = Math.round(baseSize.height * scale);

			const url = urlFor(source)
				.width(width)
				.height(height)
				.quality(quality)
				.format(format)
				.fit(fit)
				.url();

			return `${url} ${scale}x`;
		})
		.join(", ");

	const fallbackUrl = urlFor(source)
		.width(baseSize.width)
		.height(baseSize.height)
		.quality(quality)
		.format("jpg")
		.fit(fit)
		.url();

	return {
		src: fallbackUrl,
		srcSet: srcset,
		width: baseSize.width,
		height: baseSize.height,
		loading: "lazy" as const,
	};
}
