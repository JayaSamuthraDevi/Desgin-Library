// icons.ts
export const ICONS = {
  add: `
      <path d="M17 15V7h-2v8H7v2h8v8h2v-8h8v-2h-8z"></path>
  `,
  close: `
      <path d="M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16z"></path>
  `,
  edit: `
      <path d="M4 26h24v2H4zM27.7 9.3l-5-5a1 1 0 0 0-1.4 0l-14 14V24h5.7l14-14a1 1 0 0 0 0-1.4z"></path>
  `,
} as const;

//  Extract a union type from keys
export type IconName = keyof typeof ICONS;
