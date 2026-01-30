import { defineConfig, buildLegacyTheme } from "sanity";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./schemaTypes";
import { WelcomeWidget } from "./components/WelcomeWidget";
import { StatusPillStyles } from "./components/StatusPillStyles";
import React from "react";
import { House, User, Briefcase, Palette, MusicNotes } from "phosphor-react";

const props = {
	"--my-white": "#fff",
	"--my-black": "#1a1a1a",
	"--my-orange": "#f97316",
	"--my-light-gray": "#f8f9fa",
	"--my-dark-gray": "#2d3748",
};

export const customTheme = buildLegacyTheme({
	"--black": props["--my-black"],
	"--white": props["--my-white"],
	"--gray": "#718096",
	"--gray-base": "#718096",
	"--component-bg": props["--my-white"],
	"--component-text-color": props["--my-black"],
	"--brand-primary": props["--my-orange"],
	"--default-button-color": "#666",
	"--default-button-primary-color": props["--my-orange"],
	"--default-button-success-color": "#10B981",
	"--default-button-warning-color": "#F59E0B",
	"--default-button-danger-color": "#EF4444",
	"--state-info-color": props["--my-orange"],
	"--state-success-color": "#10B981",
	"--state-warning-color": "#F59E0B",
	"--state-danger-color": "#EF4444",
	"--main-navigation-color": props["--my-orange"],
	"--main-navigation-color--inverted": props["--my-white"],
	"--focus-color": props["--my-orange"],
});

export default defineConfig({
	name: "default",
	title: "JeffH Portfolio",

	projectId: "wtlgwnno",
	dataset: "production",

	document: {
		productionUrl: async (prev, context) => {
			const slug = context.document?.slug as { current?: string };
			return `${slug?.current ? `/work/${slug.current}` : "#"}`;
		},
	},

	plugins: [
		deskTool({
			structure: (S) =>
				S.list()
					.title("Content Management")
					.items([
						S.listItem()
							.title("Dashboard")
							.icon(() =>
								React.createElement(House, {
									size: 18,
									color: "currentColor",
									weight: "duotone",
								})
							)
							.child(
								S.component(() =>
									React.createElement(
										React.Fragment,
										null,
										React.createElement(StatusPillStyles),
										React.createElement(WelcomeWidget)
									)
								).title("Welcome Dashboard")
							),
						S.divider(),
						S.listItem()
							.title("About Page")
							.icon(() =>
								React.createElement(User, {
									size: 18,
									color: "currentColor",
									weight: "duotone",
								})
							)
							.id("about")
							.child(
								S.document()
									.schemaType("about")
									.documentId("about")
									.title("About Page")
							),
						S.divider(),
						S.listItem()
							.title("Portfolio")
							.icon(() =>
								React.createElement(Briefcase, {
									size: 18,
									color: "currentColor",
									weight: "duotone",
								})
							)
							.schemaType("project")
							.child(
								S.documentTypeList("project")
									.title("Portfolio")
									.filter('_type == "project"')
									.defaultOrdering([
										{ field: "featured", direction: "desc" },
										{ field: "title", direction: "asc" },
									])
							),
						S.listItem()
							.title("Playground")
							.icon(() =>
								React.createElement(Palette, {
									size: 18,
									color: "currentColor",
									weight: "duotone",
								})
							)
							.schemaType("playground")
							.child(
								S.documentTypeList("playground")
									.title("Playground")
									.filter('_type == "playground"')
									.defaultOrdering([
										{ field: "featured", direction: "desc" },
										{ field: "publishedAt", direction: "desc" },
									])
							),
						S.listItem()
							.title("Playlists")
							.icon(() =>
								React.createElement(MusicNotes, {
									size: 18,
									color: "currentColor",
									weight: "duotone",
								})
							)
							.schemaType("playlist")
							.child(
								S.documentTypeList("playlist")
									.title("Playlists")
									.filter('_type == "playlist"')
									.defaultOrdering([
										{ field: "featured", direction: "desc" },
										{ field: "publishedAt", direction: "desc" },
									])
							),
					]),
		}),
	],

	schema: {
		types: schemaTypes,
	},

	theme: customTheme,

	tools: (prev) => prev,
});
