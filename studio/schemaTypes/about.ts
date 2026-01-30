import { defineType, defineField, defineArrayMember } from "sanity";
import React from "react";
import { User } from "phosphor-react";

export const about = defineType({
	name: "about",
	title: "About Page",
	type: "document",
	icon: () =>
		React.createElement(User, {
			size: 18,
			color: "#f97316",
			weight: "duotone",
		}),
	fields: [
		defineField({
			name: "title",
			title: "Page Title",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "bio",
			title: "Bio",
			type: "array",
			of: [
				defineArrayMember({ type: "block" }),
				defineArrayMember({
					type: "object",
					name: "spacer",
					title: "Spacer",
					fields: [
						defineField({
							name: "note",
							type: "string",
							title: "Spacer",
							hidden: true,
							initialValue: "spacer",
						}),
					],
					preview: {
						prepare() {
							return { title: "Spacer (1 line)" };
						},
					},
				}),
			],
			description: "Rich text bio with formatting options",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "shortBio",
			title: "Short Bio (Deprecated)",
			type: "text",
			description: "Brief bio for homepage and meta descriptions (max 200 characters)",
			validation: (rule) => rule.max(200),
			deprecated: {
				reason: "Use the Capabilities section instead.",
			},
			readOnly: true,
			hidden: ({ value }) => value === undefined,
			initialValue: undefined,
		}),
		defineField({
			name: "capabilities",
			title: "Capabilities",
			type: "array",
			of: [defineArrayMember({ type: "string" })],
			description: "List of capabilities shown on the About page",
			validation: (rule) => rule.unique(),
		}),
		defineField({
			name: "awards",
			title: "Awards",
			type: "array",
			of: [
				defineArrayMember({
					type: "object",
					name: "award",
					title: "Award",
					fields: [
						defineField({
							name: "title",
							title: "Title",
							type: "string",
							validation: (rule) => rule.required(),
						}),
						defineField({
							name: "issuer",
							title: "Issuer",
							type: "string",
						}),
						defineField({
							name: "year",
							title: "Year",
							type: "string",
						}),
						defineField({
							name: "url",
							title: "URL",
							type: "url",
						}),
					],
					preview: {
						select: {
							title: "title",
							issuer: "issuer",
							year: "year",
						},
						prepare({ title, issuer, year }) {
							const subtitleParts = [issuer, year].filter(Boolean);
							return {
								title: title || "Award",
								subtitle: subtitleParts.join(" - "),
							};
						},
					},
				}),
			],
			description: "Awards and recognition to display on the About page",
		}),
		defineField({
			name: "profileImage",
			title: "Profile Image",
			type: "image",
			options: {
				hotspot: true,
			},
			fields: [
				defineField({
					name: "alt",
					type: "string",
					title: "Alternative Text",
				}),
			],
		}),
		defineField({
			name: "contact",
			title: "Contact Information",
			type: "object",
			fields: [
				defineField({
					name: "email",
					title: "Email",
					type: "string",
					validation: (rule) => rule.required().email(),
				}),
				defineField({
					name: "instagram",
					title: "Instagram URL",
					type: "url",
					description: "Full Instagram profile URL",
				}),
				defineField({
					name: "linkedin",
					title: "LinkedIn URL",
					type: "url",
					description: "Full LinkedIn profile URL",
				}),
			],
		}),
	],
	preview: {
		select: {
			title: "title",
		},
	},
});
