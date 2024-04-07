import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import UnoCSS from "unocss/astro";
import unoConfig from "@flowdev/unocss";

// https://astro.build/config
export default defineConfig({
  integrations: [
    UnoCSS({
      configResolved: () => unoConfig,
    }),
    starlight({
      title: "Flow",
      social: {
        github: "https://github.com/richardguerre/flow",
      },
      sidebar: [
        {
          label: "Guides",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Example Guide", link: "/guides/example/" },
          ],
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
    }),
  ],
});
